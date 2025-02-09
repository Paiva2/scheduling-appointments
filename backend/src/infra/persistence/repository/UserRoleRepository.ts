import { UserRoleEntity } from "../../../core/entity";
import { IUserRoleRepository } from "../../../core/interfaces/repository";
import pool from "../database/postgres/connection";
import { UserRoleMapper } from "../mappers/UserRoleMapper";

export class UserRoleRepository implements IUserRoleRepository {
  public async persist(userRole: UserRoleEntity): Promise<UserRoleEntity> {
    const { rows } = await pool.query(
      `
        INSERT INTO tb_users_roles (usl_user_id, usl_role_id)
        VALUES ($1, $2)
        RETURNING *
    `,
      [userRole.getUserId(), userRole.getRoleId()]
    );

    return UserRoleMapper.toDomain(rows[0])!;
  }
}
