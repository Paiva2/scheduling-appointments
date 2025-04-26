import moment from "moment-timezone";
import { SchedulingEntity, UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { ISchedulingRepository, IUserRepository } from "../../../interfaces/repository";
import { SchedulingNotFoundException, UserNotFoundException } from "../../common/exception";
import { ICancelScheduleAsPacientInput } from "./dto/cancelScheduleAsPacientInput";
import { IQueueRepository } from "../../../interfaces/adapter/IQueueRepository";
import CancelScheduleAsPacientException from "./dto/exception/cancelScheduleAsPacientException";

export class CancelScheduleAsPacientUsecase implements IUsecase<ICancelScheduleAsPacientInput, void> {
  private readonly SCHEDULINGS_URL = "http://localhost:5173/appointments";

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly schedulingRepository: ISchedulingRepository,
    private readonly queueRepository: IQueueRepository
  ) {}

  public async execute(input: ICancelScheduleAsPacientInput) {
    const user = await this.findUser(input.userId);

    const scheduling = await this.findScheduling(input.id, user.getId()!);

    this.checkSchedulingValidity(scheduling);
    await this.cancelSchedule(scheduling);

    await this.notifyDoctor(user, scheduling.getUserDoctor()!, scheduling.getScheduledAt());
  }

  private async findUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (user === null) {
      throw new UserNotFoundException("User not found!");
    }

    const isUserDoctor = user
      .getUserRoles()
      ?.some((userRole) => userRole.getRoleEntity()?.getName() === "DOCTOR");

    if (isUserDoctor) {
      throw new CancelScheduleAsPacientException("Only pacients can cancel their own scheduling!");
    }

    return user;
  }

  private async findScheduling(id: string, userId: string): Promise<SchedulingEntity> {
    const scheduling = await this.schedulingRepository.findByIdAndUser(id, userId);

    if (scheduling === null) {
      throw new SchedulingNotFoundException("Scheduling not found!");
    }

    return scheduling;
  }

  private checkSchedulingValidity(scheduling: SchedulingEntity): void {
    if (!scheduling.isActive()) {
      throw new CancelScheduleAsPacientException("Scheduling is already inactive!");
    }

    if (scheduling.getFinishedAt() !== null) {
      throw new CancelScheduleAsPacientException("Scheduling is already finished!");
    }

    const now = moment.tz(moment.now(), "America/Sao_Paulo");
    const schedulingDate = moment.tz(scheduling.getScheduledAt(), "America/Sao_Paulo");

    if (now.isAfter(schedulingDate)) {
      throw new CancelScheduleAsPacientException("Can't cancel schedulings that are already in the past!");
    }

    const schedulingMinutesDiff = schedulingDate.diff(now, "minutes");

    if (schedulingMinutesDiff <= 60) {
      throw new CancelScheduleAsPacientException("Can't cancel schedulings 1h or less from now!");
    }
  }

  private async cancelSchedule(scheduling: SchedulingEntity): Promise<void> {
    scheduling.setActive(false);
    await this.schedulingRepository.update(scheduling);
  }

  private async notifyDoctor(user: UserEntity, doctor: UserEntity, scheduledAt: Date): Promise<void> {
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
            <p>Olá, ${doctor.getName()}!</p>
            <p>
                Seu agendamento do dia <strong>${this.formatDateBr(scheduledAt)}</strong>,
                com o paciente <strong>${user.getName()}</strong> foi cancelado.
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
      to: doctor.getEmail(),
      title,
      message,
    });
  }

  private formatDateBr(date: Date): String {
    return moment(date).format("DD/MM/yyyy HH:mm");
  }
}
