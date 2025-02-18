import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { IUpdateProfileInput } from "../../../core/usecase/user/updateProfile/dto/UpdateProfileInput";
import { DatabaseUtils } from "../../../infra/utils/databaseUtils";
import { PasswordUtils } from "../../../infra/utils/passwordUtils";
import UpdateProfileUsecase from "../../../core/usecase/user/updateProfile/updateProfileUsecase";
import AddressRepositoryPg from "../../../infra/persistence/repository/AddressRepositoryPg";
import SpecialismRepositoryPg from "../../../infra/persistence/repository/SpecialismRepositoryPg";
import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import UserSpecialismRepositoryPg from "../../../infra/persistence/repository/UserSpecialismRepositoryPg";

export default class UpdateProfileFactory {
  public static create(): IUsecase<IUpdateProfileInput, void> {
    const userRepository = new UserRepositoryPg();
    const addressRepository = new AddressRepositoryPg();
    const userSpecialismRepository = new UserSpecialismRepositoryPg();
    const specialismRepository = new SpecialismRepositoryPg();
    const passwordUtils = new PasswordUtils();
    const databaseUtils = new DatabaseUtils();

    return new UpdateProfileUsecase(
      userRepository,
      addressRepository,
      userSpecialismRepository,
      specialismRepository,
      passwordUtils,
      databaseUtils
    );
  }
}
