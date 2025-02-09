import { RoleEntity } from "../../../core/entity";
import { IRole } from "../entity/IRole";

export class RoleMapper {
  public static toDomain(role: IRole): RoleEntity | null {
    if (role == null) return null;
    return new RoleEntity(role.rl_id, role.rl_name, role.rl_created_at);
  }
}
