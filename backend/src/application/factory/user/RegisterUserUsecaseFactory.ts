import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { RoleRepository } from "../../../infra/persistence/repository/RoleRepository";
import { PasswordUtils } from "../../../infra/utils/passwordUtils";
import { DatabaseUtils } from "../../../infra/utils/databaseUtils";
import { IRegisterUserInput } from "../../../core/usecase/user/registerUser/dto/IRegisterUserInput";
import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import RegisterUserUsecase from "../../../core/usecase/user/registerUser/registerUserUsecase";
import AddressRepositoryPg from "../../../infra/persistence/repository/AddressRepositoryPg";
import UserRoleRepositoryPg from "../../../infra/persistence/repository/UserRoleRepositoryPg";
import SpecialismRepositoryPg from "../../../infra/persistence/repository/SpecialismRepositoryPg";
import UserSpecialismRepository from "../../../infra/persistence/repository/UserSpecialismRepositoryPg";

export default class RegisterUserUsecaseFactory {
  constructor() {}

  public static create(): IUsecase<IRegisterUserInput, void> {
    const userRepository = new UserRepositoryPg();
    const addressRepository = new AddressRepositoryPg();
    const passwordUtils = new PasswordUtils();
    const roleRepository = new RoleRepository();
    const userRoleRepository = new UserRoleRepositoryPg();
    const specialismRepository = new SpecialismRepositoryPg();
    const userSpecialismRepository = new UserSpecialismRepository();
    const databaseUtils = new DatabaseUtils();

    return new RegisterUserUsecase(
      userRepository,
      addressRepository,
      roleRepository,
      userRoleRepository,
      specialismRepository,
      userSpecialismRepository,
      passwordUtils,
      databaseUtils
    );
  }
}
