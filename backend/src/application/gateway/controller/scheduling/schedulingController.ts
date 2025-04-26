import { NextFunction, Request, Response } from "express";
import { IUsecase } from "../../../../core/interfaces/adapter/IUsecase";
import { ICreateScheduleInput } from "../../../../core/usecase/schedulings/createSchedule/dto/createScheduleInput";
import CreateScheduleFactory from "../../../factory/scheduling/createScheduleFactory";
import { IListUserSchedulingInput } from "../../../../core/usecase/schedulings/listUserSchedulings/dto/listUserSchedulingsInput";
import { IListUserSchedulingOutput } from "../../../../core/usecase/schedulings/listUserSchedulings/dto/listUserSchedulingOutput";
import ListUserSchedulingFactory from "../../../factory/scheduling/listUserSchedulingFactory";
import { IPageableList } from "../../../../core/interfaces/utils/IPageableList";
import { IListDoctorSchedulingInput } from "../../../../core/usecase/schedulings/listDoctorSchedulings/dto/listDoctorSchedulingsInput";
import { IListDoctorSchedulingOutput } from "../../../../core/usecase/schedulings/listDoctorSchedulings/dto/listDoctorSchedulingOutput";
import ListDoctorSchedulingFactory from "../../../factory/scheduling/listDoctorSchedulingFactory copy";
import { ICancelScheduleAsPacientInput } from "../../../../core/usecase/schedulings/cancelScheduleAsPacient/dto/cancelScheduleAsPacientInput";
import CancelScheduleAsPacientFactory from "../../../factory/scheduling/cancelScheduleAsPacientFactory";
import { ICancelScheduleAsDoctorInput } from "../../../../core/usecase/schedulings/cancelScheduleAsDoctor/dto/cancelScheduleAsDoctorInput";
import CancelScheduleAsDoctorFactory from "../../../factory/scheduling/cancelScheduleAsDoctorFactory";

export default class SchedulingController {
  private readonly createSchedulingUsecase: IUsecase<ICreateScheduleInput, void>;
  private readonly listUserSchedulingUsecase: IUsecase<
    IListUserSchedulingInput,
    IPageableList<IListUserSchedulingOutput>
  >;
  private readonly listDoctorSchedulingUsecase: IUsecase<
    IListDoctorSchedulingInput,
    IPageableList<IListDoctorSchedulingOutput>
  >;
  private readonly cancelSchedulingAsPacientUsecase: IUsecase<ICancelScheduleAsPacientInput, void>;
  private readonly cancelSchedulingAsDoctorUsecase: IUsecase<ICancelScheduleAsDoctorInput, void>;

  constructor() {
    this.createSchedulingUsecase = CreateScheduleFactory.create();
    this.listUserSchedulingUsecase = ListUserSchedulingFactory.create();
    this.listDoctorSchedulingUsecase = ListDoctorSchedulingFactory.create();
    this.cancelSchedulingAsPacientUsecase = CancelScheduleAsPacientFactory.create();
    this.cancelSchedulingAsDoctorUsecase = CancelScheduleAsDoctorFactory.create();
  }

  public async createScheduling(req: Request, res: Response, _next: NextFunction) {
    const subject = req.headers["authentication-principal"] as string;

    await this.createSchedulingUsecase.execute({
      id: subject,
      informations: req.body.informations,
      scheduleDate: req.body.scheduleDate,
      userDoctorId: req.body.userDoctorId,
    });

    return res.status(201).send();
  }

  public async listUserSchedulings(req: Request, res: Response, _next: NextFunction) {
    const subject = req.headers["authentication-principal"] as string;

    const output = await this.listUserSchedulingUsecase.execute({
      id: subject,
      page: !!req.query.page ? Number(req.query.page) : 1,
      size: !!req.query.size ? Number(req.query.size) : 15,
    });

    return res.status(200).send(output);
  }

  public async listDoctorSchedulings(req: Request, res: Response, _next: NextFunction) {
    const subject = req.headers["authentication-principal"] as string;

    const output = await this.listDoctorSchedulingUsecase.execute({
      id: subject,
      page: !!req.query.page ? Number(req.query.page) : 1,
      size: !!req.query.size ? Number(req.query.size) : 15,
    });

    return res.status(200).send(output);
  }

  public async cancelSchedulingAsPacient(req: Request, res: Response, _next: NextFunction) {
    const subject = req.headers["authentication-principal"] as string;
    const schedulingId = req.params.schedulingId;

    await this.cancelSchedulingAsPacientUsecase.execute({
      id: schedulingId,
      userId: subject,
    });

    return res.status(200).send();
  }

  public async cancelSchedulingAsDoctor(req: Request, res: Response, _next: NextFunction) {
    const subject = req.headers["authentication-principal"] as string;
    const schedulingId = req.params.schedulingId;

    await this.cancelSchedulingAsDoctorUsecase.execute({
      id: schedulingId,
      doctorId: subject,
    });

    return res.status(200).send();
  }
}
