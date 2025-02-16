import { SpecialismEntity } from "../../../core/entity";
import { EnumSpecialism } from "../../../core/enum/EnumSpecialism";
import { ISpecialismRepository } from "../../../core/interfaces/repository";
import pool from "../database/postgres/connection";
import SpecialismMapper from "../mappers/specialismMapper";

export default class SpecialismRepositoryPg implements ISpecialismRepository {
  public async findSpecialismByName(name: string): Promise<SpecialismEntity | null> {
    const { rows } = await pool.query(`SELECT * FROM tb_specialisms WHERE spe_name = $1`, [name]);

    return SpecialismMapper.toDomain(rows[0])!;
  }

  public async findSpecialismsId(specialisms: string[]): Promise<SpecialismEntity[]> {
    const { rows } = await pool.query(`SELECT * FROM tb_specialisms WHERE spe_id = ANY ($1)`, [specialisms]);

    return rows.map((row) => SpecialismMapper.toDomain(row)!);
  }

  public async findAllSpecialisms(): Promise<SpecialismEntity[]> {
    const { rows } = await pool.query(`SELECT * FROM tb_specialisms ORDER BY spe_name ASC`);

    return rows.map((row) => SpecialismMapper.toDomain(row)!);
  }
}
