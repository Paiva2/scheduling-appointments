import { SpecialismEntity } from "../../../core/entity";
import { ISpecialism } from "../entity/ISpecialism";

export default class SpecialismMapper {
  public static toDomain(specialism: ISpecialism): SpecialismEntity | null {
    if (specialism == null) return null;

    return new SpecialismEntity(specialism.spe_id, specialism.spe_name, specialism.spe_created_at);
  }
}
