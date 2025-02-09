export default class UserEntity {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date;

  constructor(id: string, name: string, email: string, password: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
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

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(date: Date) {
    this.createdAt = date;
  }
}
