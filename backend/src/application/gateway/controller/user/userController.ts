import { NextFunction, Request, Response } from "express";
import { IUsecase } from "../../../../core/interfaces/adapter/IUsecase";
import RegisterUserUsecaseFactory from "../../../factory/user/RegisterUserUsecaseFactory";

export default class UserController {
  private registerUserUsecase: IUsecase;

  constructor() {
    this.registerUserUsecase = RegisterUserUsecaseFactory.create();
  }

  public async registerUser(req: Request, res: Response, _next: NextFunction) {
    await this.registerUserUsecase.execute(req.body);

    return res.status(201).send();
  }
}
