import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { IPageableList } from "../../../core/interfaces/utils/IPageableList";
import { IListDoctorSchedulingOutput } from "../../../core/usecase/schedulings/listDoctorSchedulings/dto/listDoctorSchedulingOutput";
import { IListDoctorSchedulingInput } from "../../../core/usecase/schedulings/listDoctorSchedulings/dto/listDoctorSchedulingsInput";
import { ListDoctorSchedulingsUsecase } from "../../../core/usecase/schedulings/listDoctorSchedulings/listDoctorSchedulingsUsecase";
import SchedulingRepositoryPg from "../../../infra/persistence/repository/SchedulingRepositoryPg";
import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";

export default class ListDoctorSchedulingFactory {
  constructor() {}

  public static create(): IUsecase<IListDoctorSchedulingInput, IPageableList<IListDoctorSchedulingOutput>> {
    const userRepository = new UserRepositoryPg();
    const schedulingRepository = new SchedulingRepositoryPg();

    return new ListDoctorSchedulingsUsecase(userRepository, schedulingRepository);
  }
}
