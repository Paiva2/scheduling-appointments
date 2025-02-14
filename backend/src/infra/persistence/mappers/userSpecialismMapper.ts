import { SpecialismEntity, UserEntity, UserSpecialismEntity } from "../../../core/entity";
import { IUserSpecialism } from "../entity/IUserSpecialism";

export default class UserSpecialismMapper {
  public static toDomain(userSpecialism: IUserSpecialism): UserSpecialismEntity | null {
    if (userSpecialism == null) return null;

    const userSpecialismEntity = new UserSpecialismEntity(
      userSpecialism.usp_user_id,
      userSpecialism.usp_spe_id,
      userSpecialism.usp_created_at,
      null,
      null
    );

    if (!!userSpecialism.usp_specialism) {
      const specialism = userSpecialism.usp_specialism;
      userSpecialismEntity.setSpecialism(new SpecialismEntity(specialism.id, specialism.name, null));
    }

    return userSpecialismEntity;
  }
}
