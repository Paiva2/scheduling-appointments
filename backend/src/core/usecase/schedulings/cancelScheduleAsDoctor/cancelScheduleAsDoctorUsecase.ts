import moment from "moment-timezone";
import { SchedulingEntity, UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { ISchedulingRepository, IUserRepository } from "../../../interfaces/repository";
import { SchedulingNotFoundException, UserNotFoundException } from "../../common/exception";
import { IQueueRepository } from "../../../interfaces/adapter/IQueueRepository";
import { ICancelScheduleAsDoctorInput } from "./dto/cancelScheduleAsDoctorInput";
import CancelScheduleAsDoctorException from "./exception/cancelScheduleAsDoctorException";

export class CancelScheduleAsDoctorUsecase implements IUsecase<ICancelScheduleAsDoctorInput, void> {
  private readonly SCHEDULINGS_URL = "http://localhost:5173/appointments";

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly schedulingRepository: ISchedulingRepository,
    private readonly queueRepository: IQueueRepository
  ) {}

  public async execute(input: ICancelScheduleAsDoctorInput) {
    const doctor = await this.findDoctor(input.doctorId);

    const scheduling = await this.findScheduling(input.id, doctor.getId()!);

    this.checkSchedulingValidity(scheduling);
    await this.cancelSchedule(scheduling);

    await this.notifyPacient(scheduling.getUser()!, doctor, scheduling.getScheduledAt());
  }

  private async findDoctor(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (user === null) {
      throw new UserNotFoundException("Doctor not found!");
    }

    const isUserDoctor = user
      .getUserRoles()
      ?.some((userRole) => userRole.getRoleEntity()?.getName() === "DOCTOR");

    if (!isUserDoctor) {
      throw new CancelScheduleAsDoctorException("Only doctors can cancel schedulings on this path!");
    }

    return user;
  }

  private async findScheduling(id: string, doctorId: string): Promise<SchedulingEntity> {
    const scheduling = await this.schedulingRepository.findByIdAndDoctor(id, doctorId);

    if (scheduling === null) {
      throw new SchedulingNotFoundException("Scheduling not found!");
    }

    return scheduling;
  }

  private checkSchedulingValidity(scheduling: SchedulingEntity): void {
    if (!scheduling.isActive()) {
      throw new CancelScheduleAsDoctorException("Scheduling is already inactive!");
    }

    if (scheduling.getFinishedAt() !== null) {
      throw new CancelScheduleAsDoctorException("Scheduling is already finished!");
    }

    const now = moment.tz(moment.now(), "America/Sao_Paulo");
    const schedulingDate = moment.tz(scheduling.getScheduledAt(), "America/Sao_Paulo");

    if (now.isAfter(schedulingDate)) {
      throw new CancelScheduleAsDoctorException("Can't cancel schedulings that are already in the past!");
    }

    const schedulingMinutesDiff = schedulingDate.diff(now, "minutes");

    if (schedulingMinutesDiff <= 60) {
      throw new CancelScheduleAsDoctorException("Can't cancel schedulings 1h or less from now!");
    }
  }

  private async cancelSchedule(scheduling: SchedulingEntity): Promise<void> {
    scheduling.setActive(false);
    await this.schedulingRepository.update(scheduling);
  }

  private async notifyPacient(user: UserEntity, doctor: UserEntity, scheduledAt: Date): Promise<void> {
    const title = "Agendamento cancelado";

    const message = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${title}</title>
        </head>
        <body>
            <p>Olá, ${user.getName()}!</p>
            <p>
                Seu agendamento do dia <strong>${this.formatDateBr(scheduledAt)}</strong>,
                com o doutor <strong>${doctor.getName()}</strong> foi cancelado.
            </p>
            <p>
                Para mais informações sobre seus agendamentos, por favor, visite sua página de
                <a href="${this.SCHEDULINGS_URL}">agendamentos.</a>
            </p>
            <p>Atenciosamente, <strong>Scheduling Appointments</strong>.</p>
        </body>
        </html>
    `;

    await this.queueRepository.publish("mail-queue", {
      to: user.getEmail(),
      title,
      message,
    });
  }

  private formatDateBr(date: Date): String {
    return moment(date).format("DD/MM/yyyy HH:mm");
  }
}
