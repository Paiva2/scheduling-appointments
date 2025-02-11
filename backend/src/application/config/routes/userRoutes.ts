import { Express, NextFunction, Request, Response } from "express";
import UserController from "../../gateway/controller/user/userController";
import { apiVersionPrefix } from "../../../main";
import { inputHandler } from "../../middleware/inputHandler";
import { registerUserInput } from "../../../core/usecase/user/registerUser/dto/IRegisterUserInput";
import { authUserInput } from "../../../core/usecase/user/authUser/dto/authUserInput";
import authValidator from "../../middleware/authValidator";
import { EnumRole } from "../../../core/enum";

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

  app.get(
    `${apiVersionPrefix}/user/profile`,
    [authValidator([EnumRole.USER.toString()])],
    (req: Request, res: Response, next: NextFunction) => userController.getProfile(req, res, next)
  );
}
