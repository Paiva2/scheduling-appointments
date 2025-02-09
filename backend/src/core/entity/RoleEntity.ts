export default class RoleEntity {
  private id: string | null;
  private name: string;
  private createdAt: Date | null;

  constructor(id: string | null, name: string, createdAt: Date | null) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }

  getId(): string | null {
    return this.id;
  }

  setId(id: string | null): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getCreatedAt(): Date | null {
    return this.createdAt;
  }

  setCreatedAt(date: Date | null) {
    this.createdAt = date;
  }
}
