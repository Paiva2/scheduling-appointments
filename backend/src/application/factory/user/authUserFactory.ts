import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import AuthUserUsecase from "../../../core/usecase/user/authUser/authUserUsecase";
import { IAuthUserInput } from "../../../core/usecase/user/authUser/dto/authUserInput";
import { IAuthUserOutput } from "../../../core/usecase/user/authUser/dto/authUserOutput";
import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import { PasswordUtils } from "../../../infra/utils/passwordUtils";

export default class AuthUserFactory {
  constructor() {}

  public static create(): IUsecase<IAuthUserInput, IAuthUserOutput> {
    const userRepository = new UserRepositoryPg();
    const passwordUtils = new PasswordUtils();

    return new AuthUserUsecase(userRepository, passwordUtils);
  }
}
