import { Express, Request, Response } from "express";
import UserController from "../../gateway/controller/user/userController";
import { apiVersionPrefix } from "../../../main";

export default function userRoutes(app: Express) {
  const userController = new UserController();

  app.post(`${apiVersionPrefix}/user/register`, [], (req: Request, res: Response) => {
    userController.registerUser(req, res);
  });
}
