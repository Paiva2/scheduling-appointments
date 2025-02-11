import { UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { IUserRepository } from "../../../interfaces/repository";
import { IPasswordUtils } from "../../../interfaces/utils/IPasswordUtils";
import { UserNotFoundException } from "../../common/exception";
import { IAuthUserInput } from "./dto/authUserInput";
import { IAuthUserOutput } from "./dto/authUserOutput";
import WrongCredentialsException from "./exception/wrongCredentialsException";

export default class AuthUserUsecase implements IUsecase<IAuthUserInput, IAuthUserOutput> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordUtils: IPasswordUtils
  ) {}

  public async execute(input: IAuthUserInput): Promise<IAuthUserOutput> {
    const user = await this.findUser(input.email);

    await this.checkPassword(user.getPassword(), input.password);

    return this.mountOutput(user);
  }

  private async findUser(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserByEmail(email);

    if (user == null) {
      throw new UserNotFoundException("User not found!");
    }

    return user;
  }

  private async checkPassword(hashedPassword: string, rawPassword: string) {
    const isPasswordValid = this.passwordUtils.verify(hashedPassword, rawPassword);

    if (!isPasswordValid) {
      throw new WrongCredentialsException();
    }
  }

  private mountOutput(user: UserEntity): IAuthUserOutput {
    return {
      id: user.getId()!,
      email: user.getEmail(),
    };
  }
}
