export default class SpecialismEntity {
  private id: string | null;
  private name: string;
  private createdAt: string | null;

  constructor(id: string | null, name: string, createdAt: string | null) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }

  public getId(): string | null {
    return this.id;
  }

  public setId(id: string | null): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getCreatedAt(): string | null {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: string | null): void {
    this.createdAt = createdAt;
  }
}
