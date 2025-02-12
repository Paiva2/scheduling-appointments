import { UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { IEmailUtils } from "../../../interfaces/utils/IEmailUtils";
import { IPasswordUtils } from "../../../interfaces/utils/IPasswordUtils";
import { UserNotFoundException } from "../../common/exception";
import { IForgotPasswordInput } from "./dto/forgotPasswordInput";
import { IUserRepository } from "../../../interfaces/repository";
import { IQueueRepository } from "../../../interfaces/adapter/IQueueRepository";

export default class ForgotPasswordUsecase implements IUsecase<IForgotPasswordInput, void> {
  private readonly PROFILE_URL = "http://localhost:5173/profile";

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordUtils: IPasswordUtils,
    private readonly queueRepository: IQueueRepository
  ) {}

  public async execute(input: IForgotPasswordInput): Promise<void> {
    const user = await this.findUser(input.email);

    const newPassword = this.generateRandomPassword();
    const hashNewPassword = await this.hashPassword(newPassword);

    this.updateUser(user, hashNewPassword);

    await this.saveUser(user);

    await this.sendEmailUpdate(user.getEmail(), user.getName(), newPassword);
  }

  private async findUser(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserByEmail(email);

    if (user == null) {
      throw new UserNotFoundException("User not found!");
    }

    return user;
  }

  private generateRandomPassword(): string {
    return this.passwordUtils.generateRandomPassword();
  }

  private async hashPassword(password: string): Promise<string> {
    return await this.passwordUtils.hash(password);
  }

  private updateUser(user: UserEntity, hashPassword: string): void {
    user.setPassword(hashPassword);
  }

  private async saveUser(user: UserEntity): Promise<void> {
    await this.userRepository.persist(user);
  }

  private async sendEmailUpdate(to: string, name: string, newPassword: string): Promise<void> {
    const title = "Solicitação de redefinição de senha";

    const message = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${title}</title>
        </head>
        <body>
            <p>Olá ${name}!</p>
            <p>Você solicitou uma <strong>redefinição de senha para sua conta.</strong></p>
            <p>Nova senha de sua conta: ${newPassword}</p>
            <p>
            Para mais informações sobre sua conta, por favor, visite sua página de
            <a href="${this.PROFILE_URL}">gerenciamento de conta.</a>
            </p>
            <p>Atenciosamente, <strong>Scheduling Appointments</strong>.</p>
        </body>
        </html>
    `;

    await this.queueRepository.publish("mail-queue", {
      to,
      title,
      message,
    });
  }
}
