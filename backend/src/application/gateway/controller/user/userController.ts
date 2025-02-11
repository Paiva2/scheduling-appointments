import { NextFunction, Request, Response } from "express";
import { IUsecase } from "../../../../core/interfaces/adapter/IUsecase";
import { IAuthUserOutput } from "../../../../core/usecase/user/authUser/dto/authUserOutput";
import { IAuthUserInput } from "../../../../core/usecase/user/authUser/dto/authUserInput";
import { IRegisterUserInput } from "../../../../core/usecase/user/registerUser/dto/IRegisterUserInput";
import { ITokenConfig } from "../../../../core/interfaces/adapter/ITokenConfig";
import AuthUserFactory from "../../../factory/user/authUserFactory";
import RegisterUserUsecaseFactory from "../../../factory/user/registerUserUsecaseFactory";
import TokenConfig from "../../../config/jwt/tokenConfig";
import { IGetProfileInput } from "../../../../core/usecase/user/getProfile/dto/getProfileInput";
import { IGetProfileOutput } from "../../../../core/usecase/user/getProfile/dto/getProfileOutput";
import GetProfileFactory from "../../../factory/user/getProfileFactory";

export default class UserController {
  private readonly registerUserUsecase: IUsecase<IRegisterUserInput, void>;
  private readonly authUserUsecase: IUsecase<IAuthUserInput, IAuthUserOutput>;
  private readonly getProfileUsecase: IUsecase<IGetProfileInput, IGetProfileOutput>;

  private readonly tokenConfig: ITokenConfig;

  constructor() {
    this.registerUserUsecase = RegisterUserUsecaseFactory.create();
    this.authUserUsecase = AuthUserFactory.create();
    this.getProfileUsecase = GetProfileFactory.create();

    this.tokenConfig = new TokenConfig();
  }

  public async registerUser(req: Request, res: Response, _next: NextFunction) {
    await this.registerUserUsecase.execute(req.body);

    return res.status(201).send();
  }

  public async authUser(req: Request, res: Response, _next: NextFunction) {
    const output = await this.authUserUsecase.execute(req.body);

    const token = this.tokenConfig.generate({
      id: output.id,
      email: output.email,
    });

    return res.status(200).send({
      token,
    });
  }

  public async getProfile(req: Request, res: Response, _next: NextFunction) {
    const subject = req.headers["authentication-principal"] as string;

    const output = await this.getProfileUsecase.execute({
      id: subject,
    });

    return res.status(200).send(output);
  }
}
