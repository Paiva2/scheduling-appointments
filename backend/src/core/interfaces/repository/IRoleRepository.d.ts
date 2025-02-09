import RoleEntity from "../../entity/RoleEntity";

export interface IRoleRepository {
  findRoleByName(name: string): Promise<RoleEntity | null>;
}
