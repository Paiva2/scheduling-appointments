export default class UserRoleEntity {
  private userId;
  private roleId;
  private createdAt;

  constructor(userId: string, roleId: string, createdAt: Date) {
    this.userId = userId;
    this.roleId = roleId;
    this.createdAt = createdAt;
  }

  getUserId(): string {
    return this.userId;
  }

  setUserId(id: string): void {
    this.userId = id;
  }

  getRoleId(): string {
    return this.roleId;
  }

  setRoleId(id: string): void {
    this.roleId = id;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(id: Date): void {
    this.createdAt = id;
  }
}
