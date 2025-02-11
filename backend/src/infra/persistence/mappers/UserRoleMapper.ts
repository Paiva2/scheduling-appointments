import { RoleEntity, UserRoleEntity } from "../../../core/entity";
import { IUserRole } from "../entity/IUserRole";

export class UserRoleMapper {
  public static toDomain(userRole: IUserRole): UserRoleEntity | null {
    if (userRole == null) return null;

    const userRoleDomain = new UserRoleEntity(
      userRole.usl_user_id,
      userRole.usl_role_id,
      userRole.usl_created_at,
      null
    );

    if (userRole.rl_id !== null) {
      userRoleDomain.setRoleEntity(
        new RoleEntity(userRole.rl_id, userRole.rl_name!, userRole.usl_created_at)
      );
    }

    return userRoleDomain;
  }
}
