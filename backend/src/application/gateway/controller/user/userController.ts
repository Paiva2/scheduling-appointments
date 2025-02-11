import { NextFunction, Request, Response } from "express";
import { IUsecase } from "../../../../core/interfaces/adapter/IUsecase";
import AuthUserFactory from "../../../factory/user/authUserFactory";
import { IAuthUserOutput } from "../../../../core/usecase/user/authUser/dto/authUserOutput";
import { IAuthUserInput } from "../../../../core/usecase/user/authUser/dto/authUserInput";
import { IRegisterUserInput } from "../../../../core/usecase/user/registerUser/dto/IRegisterUserInput";
import RegisterUserUsecaseFactory from "../../../factory/user/registerUserUsecaseFactory";
import { ITokenConfig } from "../../../../core/interfaces/adapter/ITokenConfig";
import TokenConfig from "../../../config/jwt/tokenConfig";

export default class UserController {
  private registerUserUsecase: IUsecase<IRegisterUserInput, void>;
  private authUserUsecase: IUsecase<IAuthUserInput, IAuthUserOutput>;

  private tokenConfig: ITokenConfig;

  constructor() {
    this.registerUserUsecase = RegisterUserUsecaseFactory.create();
    this.authUserUsecase = AuthUserFactory.create();
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
}
