import { NextFunction, Request, Response } from "express";
import { IUsecase } from "../../../../core/interfaces/adapter/IUsecase";
import { ICreateScheduleInput } from "../../../../core/usecase/schedulings/createSchedule/dto/createScheduleInput";
import CreateScheduleFactory from "../../../factory/scheduling/createScheduleFactory";

export default class SchedulingController {
  private readonly createSchedulingUsecase: IUsecase<
    ICreateScheduleInput,
    void
  >;

  constructor() {
    this.createSchedulingUsecase = CreateScheduleFactory.create();
  }

  public async createScheduling(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const subject = req.headers["authentication-principal"] as string;

    await this.createSchedulingUsecase.execute({
      id: subject,
      informations: req.body.informations,
      scheduleDate: req.body.scheduleDate,
      userDoctorId: req.body.userDoctorId,
    });

    return res.status(201).send();
  }
}
