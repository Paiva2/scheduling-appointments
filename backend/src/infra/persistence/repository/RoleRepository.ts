import { RoleEntity } from "../../../core/entity";
import { IRoleRepository } from "../../../core/interfaces/repository";
import pool from "../database/postgres/connection";
import { RoleMapper } from "../mappers/roleMapper";

export class RoleRepository implements IRoleRepository {
  public async findRoleByName(name: string): Promise<RoleEntity | null> {
    const { rows } = await pool.query(`SELECT * FROM tb_roles WHERE rl_name = $1`, [name]);

    return RoleMapper.toDomain(rows[0])!;
  }
}
