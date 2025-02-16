import { Request, Response, NextFunction } from "express";
import { IUsecase } from "../../../../core/interfaces/adapter/IUsecase";
import { IListSpecialismsOutput } from "../../../../core/usecase/specialism/listSpecialisms/dto/listSpecialismsOutput";
import ListSpecialismsFactory from "../../../factory/specialism/listSpecialismsFactory";

export class SpecialismController {
  private readonly listSpecialismsUsecase: IUsecase<void, IListSpecialismsOutput[]>;

  constructor() {
    this.listSpecialismsUsecase = ListSpecialismsFactory.create();
  }

  public async getSpecialisms(req: Request, res: Response, _next: NextFunction) {
    const output = await this.listSpecialismsUsecase.execute();

    return res.status(200).send(output);
  }
}
