import { Express, NextFunction, Request, Response } from "express";
import { apiVersionPrefix } from "../../../main";
import { registerUserInput } from "../../../core/usecase/user/registerUser/dto/IRegisterUserInput";
import { inputHandler } from "../../middleware/inputHandler";
import { authUserInput } from "../../../core/usecase/user/authUser/dto/authUserInput";
import { forgotPasswordInput } from "../../../core/usecase/user/forgotPassword/dto/forgotPasswordInput";
import UserController from "../../gateway/controller/user/userController";
import authValidator from "../../middleware/authValidator";
import { updateProfileInput } from "../../../core/usecase/user/updateProfile/dto/UpdateProfileInput";

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

  app.put(
    `${apiVersionPrefix}/user/profile/update`,
    [authValidator(["*"]), inputHandler(updateProfileInput)],
    (req: Request, res: Response, next: NextFunction) => userController.updateProfile(req, res, next)
  );
}
