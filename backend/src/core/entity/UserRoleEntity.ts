import RoleEntity from "./RoleEntity";

export default class UserRoleEntity {
  private userId: string;
  private roleId: string;
  private createdAt: Date | null;

  private roleEntity: RoleEntity | null;

  constructor(
    userId: string,
    roleId: string,
    createdAt: Date | null,
    roleEntity: RoleEntity | null
  ) {
    this.userId = userId;
    this.roleId = roleId;
    this.createdAt = createdAt;
    this.roleEntity = roleEntity;
  }

  public getUserId(): string {
    return this.userId;
  }

  public setUserId(id: string): void {
    this.userId = id;
  }

  public getRoleId(): string {
    return this.roleId;
  }

  public setRoleId(id: string): void {
    this.roleId = id;
  }

  public getCreatedAt(): Date | null {
    return this.createdAt;
  }

  public setCreatedAt(id: Date | null): void {
    this.createdAt = id;
  }

  public getRoleEntity(): RoleEntity | null {
    return this.roleEntity;
  }

  public setRoleEntity(roleEntity: RoleEntity | null) {
    this.roleEntity = roleEntity;
  }
}
