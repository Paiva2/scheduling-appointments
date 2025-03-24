import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { CreateScheduleUsecase } from "../../../core/usecase/schedulings/createSchedule/createScheduleUsecase";
import { ICreateScheduleInput } from "../../../core/usecase/schedulings/createSchedule/dto/createScheduleInput";
import SchedulingRepositoryPg from "../../../infra/persistence/repository/SchedulingRepositoryPg";
import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import QueueRepository from "../../../infra/queue/queueRepository";

export default class CreateScheduleFactory {
  constructor() {}

  public static create(): IUsecase<ICreateScheduleInput, void> {
    const userRepository = new UserRepositoryPg();
    const schedulingRepository = new SchedulingRepositoryPg();
    const queueRepository = new QueueRepository();

    return new CreateScheduleUsecase(
      userRepository,
      schedulingRepository,
      queueRepository
    );
  }
}
