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
    (req: Request, res: Response, next: NextFunction) => schedulingController.createScheduling(req, res, next)
  );

  app.get(
    `${apiVersionPrefix}/schedulings/pacient/list`,
    [authValidator(["USER", "ADMIN"])],
    (req: Request, res: Response, next: NextFunction) =>
      schedulingController.listUserSchedulings(req, res, next)
  );

  app.get(
    `${apiVersionPrefix}/schedulings/doctor/list`,
    [authValidator(["DOCTOR", "ADMIN"])],
    (req: Request, res: Response, next: NextFunction) =>
      schedulingController.listDoctorSchedulings(req, res, next)
  );

  app.delete(
    `${apiVersionPrefix}/schedulings/pacient/cancel/:schedulingId`,
    [authValidator(["USER", "ADMIN"])],
    (req: Request, res: Response, next: NextFunction) =>
      schedulingController.cancelSchedulingAsPacient(req, res, next)
  );

  app.delete(
    `${apiVersionPrefix}/schedulings/doctor/cancel/:schedulingId`,
    [authValidator(["DOCTOR", "ADMIN"])],
    (req: Request, res: Response, next: NextFunction) =>
      schedulingController.cancelSchedulingAsDoctor(req, res, next)
  );
}
