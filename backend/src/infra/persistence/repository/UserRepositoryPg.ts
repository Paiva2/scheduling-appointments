import UserEntity from "../../../core/entity/UserEntity";
import { IUserRepository } from "../../../core/interfaces/repository/IUserRepository";
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

  public async persist(user: UserEntity): Promise<UserEntity> {
    const { rows } = await pool.query(
      `
        INSERT INTO tb_users (usr_name, usr_email, usr_password)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [user.getName(), user.getEmail(), user.getPassword()]
    );

    return UserMapper.toDomain(rows[0])!;
  }
}
