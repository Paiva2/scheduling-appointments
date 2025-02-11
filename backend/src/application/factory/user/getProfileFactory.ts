import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import AddressRepositoryPg from "../../../infra/persistence/repository/AddressRepositoryPg";
import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import GetProfileUsecase from "../../../core/usecase/user/getProfile/getProfileUsecase";
import { IGetProfileInput } from "../../../core/usecase/user/getProfile/dto/getProfileInput";
import { IGetProfileOutput } from "../../../core/usecase/user/getProfile/dto/getProfileOutput";

export default class GetProfileFactory {
  constructor() {}

  public static create(): IUsecase<IGetProfileInput, IGetProfileOutput> {
    const userRepository = new UserRepositoryPg();
    const addressRepository = new AddressRepositoryPg();

    return new GetProfileUsecase(userRepository, addressRepository);
  }
}
