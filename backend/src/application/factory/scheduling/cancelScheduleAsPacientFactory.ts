import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { CancelScheduleAsPacientUsecase } from "../../../core/usecase/schedulings/cancelScheduleAsPacient/cancelScheduleAsPacientUsecase";
import { ICancelScheduleAsPacientInput } from "../../../core/usecase/schedulings/cancelScheduleAsPacient/dto/cancelScheduleAsPacientInput";
import SchedulingRepositoryPg from "../../../infra/persistence/repository/SchedulingRepositoryPg";
import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import QueueRepository from "../../../infra/queue/queueRepository";

export default class CancelScheduleAsPacientFactory {
  constructor() {}

  public static create(): IUsecase<ICancelScheduleAsPacientInput, void> {
    const userRepository = new UserRepositoryPg();
    const schedulingRepository = new SchedulingRepositoryPg();
    const queueRepository = new QueueRepository();

    return new CancelScheduleAsPacientUsecase(userRepository, schedulingRepository, queueRepository);
  }
}
