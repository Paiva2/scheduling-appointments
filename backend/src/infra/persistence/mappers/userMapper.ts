import UserEntity from "../../../core/entity/UserEntity";
import { IUser } from "../entity/IUser";

export default class UserMapper {
  public static toDomain(user: IUser): UserEntity | null {
    if (user == null) return null;

    return new UserEntity(
      user.usr_id,
      user.usr_name,
      user.usr_email,
      user.usr_password,
      user.usr_created_at
    );
  }
}
