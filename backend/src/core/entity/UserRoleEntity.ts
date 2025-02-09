export default class UserRoleEntity {
  private userId: string;
  private roleId: string;
  private createdAt: Date | null;

  constructor(userId: string, roleId: string, createdAt: Date | null) {
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

  getCreatedAt(): Date | null {
    return this.createdAt;
  }

  setCreatedAt(id: Date | null): void {
    this.createdAt = id;
  }
}
