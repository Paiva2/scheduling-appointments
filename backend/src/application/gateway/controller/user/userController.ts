import { NextFunction, Request, Response } from "express";
import { IUsecase } from "../../../../core/interfaces/adapter/IUsecase";
import { IAuthUserOutput } from "../../../../core/usecase/user/authUser/dto/authUserOutput";
import { IAuthUserInput } from "../../../../core/usecase/user/authUser/dto/authUserInput";
import { IRegisterUserInput } from "../../../../core/usecase/user/registerUser/dto/IRegisterUserInput";
import { ITokenConfig } from "../../../../core/interfaces/adapter/ITokenConfig";
import { IGetProfileInput } from "../../../../core/usecase/user/getProfile/dto/getProfileInput";
import { IGetProfileOutput } from "../../../../core/usecase/user/getProfile/dto/getProfileOutput";
import { IForgotPasswordInput } from "../../../../core/usecase/user/forgotPassword/dto/forgotPasswordInput";
import { IListDoctorsInput } from "../../../../core/usecase/user/listDoctors/dto/listDoctorsInput";
import { IListDoctorsOutput } from "../../../../core/usecase/user/listDoctors/dto/listDoctorsOutput";
import { IPageableList } from "../../../../core/interfaces/utils/IPageableList";
import TokenConfig from "../../../config/jwt/tokenConfig";
import RegisterUserUsecaseFactory from "../../../factory/user/registerUserUsecaseFactory";
import AuthUserFactory from "../../../factory/user/authUserFactory";
import GetProfileFactory from "../../../factory/user/getProfileFactory";
import ForgotPasswordFactory from "../../../factory/user/forgotPasswordFactory";
import ListDoctorsFactory from "../../../factory/user/listDoctorsFactory";

export default class UserController {
  private readonly registerUserUsecase: IUsecase<IRegisterUserInput, void>;
  private readonly authUserUsecase: IUsecase<IAuthUserInput, IAuthUserOutput>;
  private readonly getProfileUsecase: IUsecase<IGetProfileInput, IGetProfileOutput>;
  private readonly forgotPasswordUsecase: IUsecase<IForgotPasswordInput, void>;
  private readonly listDoctorsUsecase: IUsecase<IListDoctorsInput, IPageableList<IListDoctorsOutput>>;

  private readonly tokenConfig: ITokenConfig;

  constructor() {
    this.registerUserUsecase = RegisterUserUsecaseFactory.create();
    this.authUserUsecase = AuthUserFactory.create();
    this.getProfileUsecase = GetProfileFactory.create();
    this.forgotPasswordUsecase = ForgotPasswordFactory.create();
    this.listDoctorsUsecase = ListDoctorsFactory.create();

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

  public async forgotPassword(req: Request, res: Response, _next: NextFunction) {
    await this.forgotPasswordUsecase.execute({ email: req.body.email });

    return res.status(200).send();
  }

  public async listDoctors(req: Request, res: Response, _next: NextFunction) {
    const output = await this.listDoctorsUsecase.execute({
      page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 5,
      state: req.query.state as string,
      specialism: req.query.specialism as string,
    });

    return res.status(200).send(output);
  }
}
