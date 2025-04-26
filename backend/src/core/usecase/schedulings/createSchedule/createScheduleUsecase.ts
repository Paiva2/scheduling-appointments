import { SchedulingEntity, UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { ISchedulingRepository } from "../../../interfaces/repository/ISchedulingRepository";
import { UserNotFoundException } from "../../common/exception";
import { IUserRepository } from "../../../interfaces/repository";
import InvalidSchedulingException from "./exception/invalidSchedulingException";
import DoctorSchedulingException from "./exception/doctorSchedulingExcepion";
import { IQueueRepository } from "../../../interfaces/adapter/IQueueRepository";
import { ICreateScheduleInput } from "./dto/createScheduleInput";
import moment from "moment-timezone";

export class CreateScheduleUsecase implements IUsecase<ICreateScheduleInput, void> {
  private readonly SCHEDULINGS_URL = "http://localhost:5173/appointments";

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly schedulingRepository: ISchedulingRepository,
    private readonly queueRepository: IQueueRepository
  ) {}

  public async execute(input: ICreateScheduleInput): Promise<void> {
    if (input.id === input.userDoctorId) {
      throw new InvalidSchedulingException("User id can't be same as doctor id!");
    }

    const scheduledDate = moment(this.cleanInputDate(input.scheduleDate));
    scheduledDate.tz("America/Sao_Paulo").format("ha z");

    const todayWithoutSeconds = moment(this.todayDate());
    todayWithoutSeconds.tz("America/Sao_Paulo").format("ha z");

    if (scheduledDate.diff(todayWithoutSeconds) < 0) {
      throw new InvalidSchedulingException("Scheduled date can't be before today!");
    }

    input.scheduleDate = scheduledDate.toDate();

    const user = await this.findUser(input.id);

    this.checkUserIsDoctor(user);

    await this.checkUserAlreadyHasSchedulingSameDate(user.getId()!, input.scheduleDate);

    const doctor = await this.findUser(input.userDoctorId);
    this.checkDoctorIsDoctor(doctor);

    await this.checkDoctorAlreadyHasSchedulingSameDate(doctor.getId()!, input.scheduleDate);

    const newScheduling = this.fillScheduling(user, doctor, input);
    await this.persistScheduling(newScheduling);

    await this.notifyUser(user, doctor, input.scheduleDate);
    await this.notifyDoctor(user, doctor, input.scheduleDate);
  }

  private async findUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (user == null) {
      throw new UserNotFoundException("User/Doctor not found!");
    }

    return user;
  }

  private todayDate(): Date {
    const today = new Date();

    today.setHours(today.getHours(), today.getMinutes(), 0, 0);

    return today;
  }

  private cleanInputDate(inputStringDate: Date): Date {
    const dateFormatted = new Date(inputStringDate);

    dateFormatted.setHours(dateFormatted.getHours(), dateFormatted.getMinutes(), 0, 0);

    return dateFormatted;
  }

  private checkUserIsDoctor(user: UserEntity): void {
    const isUserDoctor = user
      .getUserRoles()
      ?.some((userRole) => userRole.getRoleEntity()?.getName() === "DOCTOR");

    if (isUserDoctor) {
      throw new DoctorSchedulingException();
    }
  }

  private checkDoctorIsDoctor(doctor: UserEntity): void {
    const isUserDoctor = doctor
      .getUserRoles()
      ?.some((userRole) => userRole.getRoleEntity()?.getName() === "DOCTOR");

    if (!isUserDoctor) {
      throw new InvalidSchedulingException("Doctor id provided is not from an user doctor!");
    }
  }

  private async checkUserAlreadyHasSchedulingSameDate(userId: string, scheduleDate: Date): Promise<void> {
    const scheduling = await this.schedulingRepository.findByUserAndDate(userId, scheduleDate);

    if (scheduling !== null) {
      throw new InvalidSchedulingException("User has already an scheduling on this same date!");
    }
  }

  private async checkDoctorAlreadyHasSchedulingSameDate(doctorId: string, scheduleDate: Date): Promise<void> {
    const scheduling = await this.schedulingRepository.findByDoctorAndDate(doctorId, scheduleDate);

    if (scheduling !== null) {
      throw new InvalidSchedulingException("Doctor has already an scheduling on this same date!");
    }
  }

  private fillScheduling(
    user: UserEntity,
    doctor: UserEntity,
    input: ICreateScheduleInput
  ): SchedulingEntity {
    return new SchedulingEntity(
      null,
      user,
      doctor,
      input.informations,
      true,
      input.scheduleDate,
      null,
      new Date(),
      new Date()
    );
  }

  private async persistScheduling(scheduling: SchedulingEntity): Promise<void> {
    await this.schedulingRepository.persist(scheduling);
  }

  private async notifyUser(user: UserEntity, doctor: UserEntity, scheduledAt: Date): Promise<void> {
    const title = "Novo agendamento";

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
                Um novo agendamento foi criado para você no dia <strong>${this.formatDateBr(
                  scheduledAt
                )}</strong>,
                com o doutor <strong>${doctor.getName()}</strong>.
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

  private async notifyDoctor(user: UserEntity, doctor: UserEntity, scheduledAt: Date): Promise<void> {
    const title = "Novo agendamento";

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
                Um novo agendamento foi criado para você no dia <strong>${this.formatDateBr(
                  scheduledAt
                )}</strong>,
                com o paciente <strong>${user.getName()}</strong>.
            </p>
            <p>
                Para mais informações sobre os agendamentos feitos com você, por favor, visite sua página de
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
