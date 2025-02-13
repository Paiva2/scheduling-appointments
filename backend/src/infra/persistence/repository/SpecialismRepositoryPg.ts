import { SpecialismEntity } from "../../../core/entity";
import { ISpecialismRepository } from "../../../core/interfaces/repository";
import pool from "../database/postgres/connection";
import SpecialismMapper from "../mappers/specialismMapper";

export default class SpecialismRepositoryPg implements ISpecialismRepository {
  public async findSpecialismByName(name: string): Promise<SpecialismEntity | null> {
    const { rows } = await pool.query(`SELECT * FROM tb_specialisms WHERE spe_name = $1`, [name]);

    return SpecialismMapper.toDomain(rows[0])!;
  }
}
