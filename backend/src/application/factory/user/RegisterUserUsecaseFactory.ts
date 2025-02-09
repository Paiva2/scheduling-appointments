import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import RegisterUserUsecase from "../../../core/usecase/user/registerUser/registerUserUsecase";
import AddressRepositoryPg from "../../../infra/persistence/repository/AddressRepositoryPg";
import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { RoleRepository } from "../../../infra/persistence/repository/RoleRepository";
import { UserRoleRepository } from "../../../infra/persistence/repository/UserRoleRepository";
import { PasswordUtils } from "../../../infra/utils/passwordUtils";

export default class RegisterUserUsecaseFactory {
  constructor() {}

  public static create(): IUsecase {
    const userRepository = new UserRepositoryPg();
    const addressRepository = new AddressRepositoryPg();
    const passwordUtils = new PasswordUtils();
    const roleRepository = new RoleRepository();
    const userRoleRepository = new UserRoleRepository();

    return new RegisterUserUsecase(
      userRepository,
      addressRepository,
      roleRepository,
      userRoleRepository,
      passwordUtils
    );
  }
}
