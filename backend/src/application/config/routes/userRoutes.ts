import { Express, NextFunction, Request, Response } from "express";
import UserController from "../../gateway/controller/user/userController";
import { apiVersionPrefix } from "../../../main";
import { inputHandler } from "../../middleware/inputHandler";
import { registerUserInput } from "../../../core/usecase/user/registerUser/dto/IRegisterUserInput";
import { authUserInput } from "../../../core/usecase/user/authUser/dto/authUserInput";

export default function userRoutes(app: Express) {
  const userController = new UserController();

  app.post(
    `${apiVersionPrefix}/user/register`,
    [inputHandler(registerUserInput)],
    (req: Request, res: Response, next: NextFunction) => userController.registerUser(req, res, next)
  );

  app.post(
    `${apiVersionPrefix}/user/login`,
    [inputHandler(authUserInput)],
    (req: Request, res: Response, next: NextFunction) => userController.authUser(req, res, next)
  );
}
