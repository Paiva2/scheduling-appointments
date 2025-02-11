export default class UserEntity {
  private id: string | null;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date | null;

  constructor(
    id: string | null,
    name: string,
    email: string,
    password: string,
    createdAt: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
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

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getCreatedAt(): Date | null {
    return this.createdAt;
  }

  public setCreatedAt(date: Date | null) {
    this.createdAt = date;
  }
}
