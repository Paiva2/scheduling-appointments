import { UserRoleEntity } from "../../entity";

export interface IUserRoleRepository {
  persist(userRole: UserRoleEntity): Promise<UserRoleEntity>;
}
