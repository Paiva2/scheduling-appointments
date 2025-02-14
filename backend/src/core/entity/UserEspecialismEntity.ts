import SpecialismEntity from "./SpecialismEntity";
import UserEntity from "./UserEntity";

export default class UserSpecialismEntity {
  private userId: string | null;
  private specialismId: string | null;
  private createdAt: string | null;

  private user: UserEntity | null;
  private specialism: SpecialismEntity | null;

  constructor(
    userId: string | null,
    specialismId: string | null,
    createdAt: string | null,
    user: UserEntity | null,
    specialism: SpecialismEntity | null
  ) {
    this.userId = userId;
    this.specialismId = specialismId;
    this.createdAt = createdAt;
    this.user = user;
    this.specialism = specialism;
  }

  public getUserId(): string | null {
    return this.userId;
  }

  public setUserId(userId: string | null): void {
    this.userId = userId;
  }

  public getSpecialismId(): string | null {
    return this.specialismId;
  }

  public setSpecialismId(specialismId: string | null): void {
    this.specialismId = specialismId;
  }

  public getCreatedAt(): string | null {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: string | null): void {
    this.createdAt = createdAt;
  }

  public getUser(): UserEntity | null {
    return this.user;
  }

  public setUser(user: UserEntity | null): void {
    this.user = user;
  }

  public getSpecialism(): SpecialismEntity | null {
    return this.specialism;
  }

  public setSpecialism(specialism: SpecialismEntity | null): void {
    this.specialism = specialism;
  }
}
