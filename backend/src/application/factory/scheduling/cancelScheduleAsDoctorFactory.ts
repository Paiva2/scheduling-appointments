import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { CancelScheduleAsDoctorUsecase } from "../../../core/usecase/schedulings/cancelScheduleAsDoctor/cancelScheduleAsDoctorUsecase";
import { ICancelScheduleAsDoctorInput } from "../../../core/usecase/schedulings/cancelScheduleAsDoctor/dto/cancelScheduleAsDoctorInput";
import SchedulingRepositoryPg from "../../../infra/persistence/repository/SchedulingRepositoryPg";
import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import QueueRepository from "../../../infra/queue/queueRepository";

export default class CancelScheduleAsDoctorFactory {
  constructor() {}

  public static create(): IUsecase<ICancelScheduleAsDoctorInput, void> {
    const userRepository = new UserRepositoryPg();
    const schedulingRepository = new SchedulingRepositoryPg();
    const queueRepository = new QueueRepository();

    return new CancelScheduleAsDoctorUsecase(userRepository, schedulingRepository, queueRepository);
  }
}
