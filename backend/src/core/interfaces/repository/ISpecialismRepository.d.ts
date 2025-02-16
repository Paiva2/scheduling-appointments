import SpecialismEntity from "../../entity/SpecialismEntity";

export interface ISpecialismRepository {
  findSpecialismByName(name: string): Promise<SpecialismEntity | null>;

  findSpecialismsId(specialisms: string[]): Promise<SpecialismEntity[]>;

  findAllSpecialisms(): Promise<SpecialismEntity[]>;
}
