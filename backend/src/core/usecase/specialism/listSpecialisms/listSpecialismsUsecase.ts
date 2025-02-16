import { SpecialismEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { ISpecialismRepository } from "../../../interfaces/repository";
import { IListSpecialismsOutput } from "./dto/listSpecialismsOutput";

export class ListSpecialismsUsecase implements IUsecase<void, IListSpecialismsOutput[]> {
  constructor(private readonly specialismRepository: ISpecialismRepository) {}

  public async execute(): Promise<IListSpecialismsOutput[]> {
    const specialisms = await this.findSpecialisms();

    return specialisms.map((specialism) => {
      return {
        id: specialism.getId()!,
        name: specialism.getName(),
      };
    });
  }

  private async findSpecialisms(): Promise<SpecialismEntity[]> {
    return await this.specialismRepository.findAllSpecialisms();
  }
}
