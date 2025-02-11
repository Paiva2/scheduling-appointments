import { UserRoleEntity } from "../../../core/entity";
import { IUserRoleRepository } from "../../../core/interfaces/repository";
import pool from "../database/postgres/connection";
import { UserRoleMapper } from "../mappers/UserRoleMapper";

export default class UserRoleRepositoryPg implements IUserRoleRepository {
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

  public async findUserRoles(userId: string): Promise<Array<UserRoleEntity | null>> {
    const { rows } = await pool.query(
      `
        SELECT usl.*, rl.*
        FROM tb_users_roles usl
        JOIN tb_roles rl ON rl.rl_id = usl_role_id
        WHERE usl.usl_user_id = $1
      `,
      [userId]
    );

    return rows.map((row) => UserRoleMapper.toDomain(row));
  }
}
