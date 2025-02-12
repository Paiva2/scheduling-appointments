import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { IForgotPasswordInput } from "../../../core/usecase/user/forgotPassword/dto/forgotPasswordInput";
import ForgotPasswordUsecase from "../../../core/usecase/user/forgotPassword/forgotPasswordUsecase";
import UserRepositoryPg from "../../../infra/persistence/repository/UserRepositoryPg";
import QueueRepository from "../../../infra/queue/queueRepository";
import { PasswordUtils } from "../../../infra/utils/passwordUtils";

export default class ForgotPasswordFactory {
  constructor() {}

  public static create(): IUsecase<IForgotPasswordInput, void> {
    const userRepository = new UserRepositoryPg();
    const passwordUtils = new PasswordUtils();
    const queueRepository = new QueueRepository();

    return new ForgotPasswordUsecase(userRepository, passwordUtils, queueRepository);
  }
}
