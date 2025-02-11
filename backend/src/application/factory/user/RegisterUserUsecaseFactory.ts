import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import RegisterUserUsecase from "../../../core/usecase/user/registerUser/registerUserUsecase";
import AddressRepositoryPg from "../../../infra/persistence/repository/AddressRepositoryPg";
import UserRoleRepositoryPg from "../../../infra/persistence/repository/UserRoleRepositoryPg";
import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { RoleRepository } from "../../../infra/persistence/repository/RoleRepository";
import { PasswordUtils } from "../../../infra/utils/passwordUtils";
import { DatabaseUtils } from "../../../infra/utils/databaseUtils";
import { IRegisterUserInput } from "../../../core/usecase/user/registerUser/dto/IRegisterUserInput";

export default class RegisterUserUsecaseFactory {
  constructor() {}

  public static create(): IUsecase<IRegisterUserInput, void> {
    const userRepository = new UserRepositoryPg();
    const addressRepository = new AddressRepositoryPg();
    const passwordUtils = new PasswordUtils();
    const roleRepository = new RoleRepository();
    const userRoleRepository = new UserRoleRepositoryPg();
    const databaseUtils = new DatabaseUtils();

    return new RegisterUserUsecase(
      userRepository,
      addressRepository,
      roleRepository,
      userRoleRepository,
      passwordUtils,
      databaseUtils
    );
  }
}
