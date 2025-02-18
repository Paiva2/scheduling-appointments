import { UserSpecialismEntity } from "../../../core/entity";
import { IUserSpecialismRepository } from "../../../core/interfaces/repository";
import pool from "../database/postgres/connection";
import UserSpecialismMapper from "../mappers/userSpecialismMapper";

export default class UserSpecialismRepositoryPg implements IUserSpecialismRepository {
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

  public async persistAll(userSpecialisms: UserSpecialismEntity[]): Promise<UserSpecialismEntity[]> {
    const { rows } = await pool.query(
      `
        INSERT INTO tb_users_specialisms (usp_user_id, usp_spe_id)
        SELECT * FROM jsonb_to_recordset($1::jsonb) AS t ("userId" uuid, "specialismId" uuid)
        RETURNING *
    `,
      [JSON.stringify(userSpecialisms)]
    );

    return rows.map((row) => UserSpecialismMapper.toDomain(row)!);
  }

  public async getUserSpecialisms(id: string): Promise<UserSpecialismEntity[]> {
    const { rows } = await pool.query(
      `
        SELECT usp.*, 
        jsonb_build_object('id', spe.spe_id, 'name', spe.spe_name) as usp_specialism
        FROM tb_users_specialisms usp
        JOIN tb_specialisms spe ON spe.spe_id = usp.usp_spe_id
        WHERE usp.usp_user_id = $1
      `,
      [id]
    );

    return rows.map((row) => UserSpecialismMapper.toDomain(row)!);
  }

  public async removeAllByUser(userId: string): Promise<void> {
    await pool.query(`DELETE FROM tb_users_specialisms WHERE usp_user_id = $1`, [userId]);
  }
}
