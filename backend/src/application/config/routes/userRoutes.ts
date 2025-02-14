import { Express, NextFunction, Request, Response } from "express";
import UserController from "../../gateway/controller/user/userController";
import { apiVersionPrefix } from "../../../main";
import { inputHandler } from "../../middleware/inputHandler";
import { registerUserInput } from "../../../core/usecase/user/registerUser/dto/IRegisterUserInput";
import { authUserInput } from "../../../core/usecase/user/authUser/dto/authUserInput";
import authValidator from "../../middleware/authValidator";
import { EnumRole } from "../../../core/enum";
import { forgotPasswordInput } from "../../../core/usecase/user/forgotPassword/dto/forgotPasswordInput";

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
    [authValidator(["*"])],
    (req: Request, res: Response, next: NextFunction) => userController.getProfile(req, res, next)
  );

  app.post(
    `${apiVersionPrefix}/user/forgot-password`,
    [inputHandler(forgotPasswordInput)],
    (req: Request, res: Response, next: NextFunction) => userController.forgotPassword(req, res, next)
  );

  app.get(
    `${apiVersionPrefix}/user/list/doctors`,
    [authValidator(["*"])],
    (req: Request, res: Response, next: NextFunction) => userController.listDoctors(req, res, next)
  );
}
