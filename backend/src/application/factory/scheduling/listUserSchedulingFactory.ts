import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { IPageableList } from "../../../core/interfaces/utils/IPageableList";
import { IListUserSchedulingOutput } from "../../../core/usecase/schedulings/listUserSchedulings/dto/listUserSchedulingOutput";
import { IListUserSchedulingInput } from "../../../core/usecase/schedulings/listUserSchedulings/dto/listUserSchedulingsInput";
import { ListUserSchedulingsUsecase } from "../../../core/usecase/schedulings/listUserSchedulings/listUserSchedulingsUsecase";
import SchedulingRepositoryPg from "../../../infra/persistence/repository/SchedulingRepositoryPg";
import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";

export default class ListUserSchedulingFactory {
  constructor() {}

  public static create(): IUsecase<IListUserSchedulingInput, IPageableList<IListUserSchedulingOutput>> {
    const userRepository = new UserRepositoryPg();
    const schedulingRepository = new SchedulingRepositoryPg();

    return new ListUserSchedulingsUsecase(userRepository, schedulingRepository);
  }
}
