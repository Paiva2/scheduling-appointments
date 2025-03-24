import { Express, Request, Response, NextFunction } from "express";
import { apiVersionPrefix } from "../../../main";
import SchedulingController from "../../gateway/controller/scheduling/schedulingController";
import { inputHandler } from "../../middleware/inputHandler";
import { createScheduleInput } from "../../../core/usecase/schedulings/createSchedule/dto/createScheduleInput";
import authValidator from "../../middleware/authValidator";

export default function schedulingRoutes(app: Express) {
  const schedulingController = new SchedulingController();

  app.post(
    `${apiVersionPrefix}/schedulings/new`,
    [inputHandler(createScheduleInput), authValidator(["*"])],
    (req: Request, res: Response, next: NextFunction) =>
      schedulingController.createScheduling(req, res, next)
  );
}
