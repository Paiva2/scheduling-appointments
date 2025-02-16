import UserEntity from "../../../core/entity/UserEntity";
import { IUserRepository } from "../../../core/interfaces/repository/IUserRepository";
import { IPageableList } from "../../../core/interfaces/utils/IPageableList";
import pool from "../database/postgres/connection";
import UserMapper from "../mappers/userMapper";

export default class UserRepositoryPg implements IUserRepository {
  public async findUserByEmail(email: string): Promise<UserEntity | null> {
    const { rows } = await pool.query(
      `
        SELECT * FROM tb_users
        WHERE usr_email = $1
      `,
      [email]
    );

    return UserMapper.toDomain(rows[0]);
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const rows = await pool.query(
      `
        SELECT distinct usr.*, 
        array_agg(jsonb_build_object('user_id', url.usl_user_id, 'role_id', url.usl_role_id, 'url_role', jsonb_build_object('id', rl.rl_id, 'name', rl.rl_name))) as usr_user_roles_list
        FROM tb_users usr
        JOIN tb_users_roles url ON url.usl_user_id = usr.usr_id
        JOIN tb_roles rl ON rl.rl_id = url.usl_role_id
        WHERE usr_id = $1
        GROUP BY (usr.usr_id)
      `,
      [id]
    );

    return UserMapper.toDomain(rows.rows[0]);
  }

  public async persist(user: UserEntity): Promise<UserEntity> {
    const { rows } = await pool.query(
      `
        INSERT INTO tb_users (usr_name, usr_email, usr_password)
        VALUES ($1, $2, $3)
        ON CONFLICT (usr_email) DO UPDATE
        SET usr_name = $1, usr_email = $2, usr_password = $3
        RETURNING *
      `,
      [user.getName(), user.getEmail(), user.getPassword()]
    );

    return UserMapper.toDomain(rows[0])!;
  }

  public async findAllDoctors(
    page: number,
    size: number,
    specialism: string | null,
    state: string | null
  ): Promise<IPageableList<UserEntity>> {
    const { rows } = await pool.query(
      `
        SELECT distinct usr.*,
        jsonb_build_object('id', adr.adr_id, 'street', adr.adr_street, 'neighbourhood', adr.adr_neighbourhood, 'state', adr.adr_state, 'city', adr.adr_city, 'country', adr.adr_country, 'zipcode', adr.adr_zipcode, 'house_number', adr.adr_house_number, 'complement', adr.adr_complement) AS usr_address,
        (SELECT array_agg(jsonb_build_object('id', spe2.spe_id, 'name', spe2.spe_name)) FROM 
          tb_users_specialisms usp2
          JOIN tb_specialisms spe2 ON spe2.spe_id = usp2.usp_spe_id
          WHERE usp2.usp_user_id = usr.usr_id
        ) AS usr_specialism_list
        FROM tb_users usr
        JOIN tb_address adr ON adr.adr_user_id = usr.usr_id
        JOIN tb_users_specialisms usp ON usp.usp_user_id = usr.usr_id
        JOIN tb_specialisms spe ON spe.spe_id = usp.usp_spe_id
        WHERE ( $3::varchar IS NULL OR spe.spe_name ILIKE concat('%', $3, '%') )
        AND ( $4::varchar IS NULL OR adr.adr_state ILIKE concat('%', $4, '%') )
        ORDER BY usr.usr_name ASC
        LIMIT $2 OFFSET ($1 - 1) * $2
      `,
      [page, size, specialism, state]
    );

    const countQuery = await pool.query(
      `
        SELECT count(*) AS full_count FROM tb_users usr
        JOIN tb_address adr ON adr.adr_user_id = usr.usr_id
        JOIN tb_users_specialisms usp ON usp.usp_user_id = usr.usr_id
        JOIN tb_specialisms spe ON spe.spe_id = usp.usp_spe_id
        WHERE ( $1::varchar IS NULL OR lower(spe.spe_name) LIKE concat('%', lower($1), '%') )
        AND ( $2::varchar IS NULL OR lower(adr.adr_state) LIKE concat('%', lower($2), '%') )
        GROUP BY adr.adr_id, usr.usr_id 
        ORDER BY usr.usr_name ASC
      `,
      [specialism, state]
    );

    const count = countQuery.rows[0]?.full_count ? Number(countQuery.rows[0].full_count) : 0;

    return {
      page: page,
      size,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      data: rows.map((row) => UserMapper.toDomain(row)!),
    };
  }
}
