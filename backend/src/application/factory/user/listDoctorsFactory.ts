import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import ListDoctorsUsecase from "../../../core/usecase/user/listDoctors/listDoctorsUsecase";
import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { IListDoctorsInput } from "../../../core/usecase/user/listDoctors/dto/listDoctorsInput";
import { IListDoctorsOutput } from "../../../core/usecase/user/listDoctors/dto/listDoctorsOutput";
import { IPageableList } from "../../../core/interfaces/utils/IPageableList";

export default class ListDoctorsFactory {
  constructor() {}

  public static create(): IUsecase<IListDoctorsInput, IPageableList<IListDoctorsOutput>> {
    const userRepository = new UserRepositoryPg();

    return new ListDoctorsUsecase(userRepository);
  }
}
