import { IUsecase } from "../../../core/interfaces/adapter/IUsecase";
import { IListSpecialismsOutput } from "../../../core/usecase/specialism/listSpecialisms/dto/listSpecialismsOutput";
import { ListSpecialismsUsecase } from "../../../core/usecase/specialism/listSpecialisms/listSpecialismsUsecase";
import SpecialismRepositoryPg from "../../../infra/persistence/repository/SpecialismRepositoryPg";

export default class ListSpecialismsFactory {
  constructor() {}

  public static create(): IUsecase<void, IListSpecialismsOutput[]> {
    const specialismRespotory = new SpecialismRepositoryPg();

    return new ListSpecialismsUsecase(specialismRespotory);
  }
}
