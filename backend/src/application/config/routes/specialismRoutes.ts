import { NextFunction, Express, Request, Response } from "express";
import { apiVersionPrefix } from "../../../main";
import { SpecialismController } from "../../gateway/controller/specialism/specialismController";

export default function specialismRoutes(app: Express) {
  const specialismController = new SpecialismController();

  app.get(`${apiVersionPrefix}/specialism/list`, (req: Request, res: Response, next: NextFunction) =>
    specialismController.getSpecialisms(req, res, next)
  );
}
