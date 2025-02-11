import { UserRoleEntity } from "../../entity";

export interface IUserRoleRepository {
  persist(userRole: UserRoleEntity): Promise<UserRoleEntity>;

  findUserRoles(userId: string): Promise<Array<UserRoleEntity | null>>;
}
