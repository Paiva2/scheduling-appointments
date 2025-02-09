import { UserRoleEntity } from "../../../core/entity";
import { IUserRole } from "../entity/IUserRole";

export class UserRoleMapper {
  public static toDomain(userRole: IUserRole): UserRoleEntity | null {
    if (userRole == null) return null;
    return new UserRoleEntity(userRole.usl_user_id, userRole.usl_role_id, userRole.usl_created_at);
  }
}
