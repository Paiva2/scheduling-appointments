import { UserSpecialismEntity } from "../../../core/entity";
import { IUserSpecialismRepository } from "../../../core/interfaces/repository";
import pool from "../database/postgres/connection";
import UserSpecialismMapper from "../mappers/userSpecialismMapper";

export default class UserSpecialismRepository implements IUserSpecialismRepository {
  public async persist(userSpecialism: UserSpecialismEntity): Promise<UserSpecialismEntity> {
    const { rows } = await pool.query(
      `
        INSERT INTO tb_users_specialisms (usp_user_id, usp_spe_id)
        VALUES ($1, $2)
        RETURNING *
    `,
      [userSpecialism.getUserId(), userSpecialism.getSpecialismId()]
    );

    return UserSpecialismMapper.toDomain(rows[0])!;
  }
}
