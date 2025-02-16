import {
  AddressEntity,
  RoleEntity,
  SpecialismEntity,
  UserRoleEntity,
  UserSpecialismEntity,
} from "../../../core/entity";
import UserEntity from "../../../core/entity/UserEntity";
import { IUser } from "../entity/IUser";

export default class UserMapper {
  public static toDomain(user: IUser): UserEntity | null {
    if (user == null) return null;

    const userEntity = new UserEntity(
      user.usr_id,
      user.usr_name,
      user.usr_email,
      user.usr_password,
      user.usr_created_at,
      null,
      null,
      null
    );

    if (!!user.usr_address) {
      const address = user.usr_address;

      userEntity.setAddress(
        new AddressEntity(
          address.id,
          address.street,
          address.neighbourhood,
          address.state,
          address.city,
          address.country,
          address.zipcode,
          address.house_number,
          address.complement,
          user.usr_id,
          null
        )
      );
    }

    if (!!user.usr_user_roles_list) {
      const userRolesList = user.usr_user_roles_list.map((userRole) => {
        return new UserRoleEntity(
          userRole.user_id,
          userRole.role_id,
          null,
          new RoleEntity(userRole.url_role.id, userRole.url_role.name, null)
        );
      });

      userEntity.setUserRoles(userRolesList);
    }

    if (!!user.usr_specialism_list) {
      const specialismList = user.usr_specialism_list.map((specialism) => {
        return new UserSpecialismEntity(
          user.usr_id,
          specialism.id,
          null,
          userEntity,
          new SpecialismEntity(specialism.id, specialism.name, null)
        );
      });

      userEntity.setuserSpecialisms(specialismList);
    }

    return userEntity;
  }
}
