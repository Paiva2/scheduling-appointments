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

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getCreatedAt(): Date | null {
    return this.createdAt;
  }

  setCreatedAt(date: Date | null) {
    this.createdAt = date;
  }
}
