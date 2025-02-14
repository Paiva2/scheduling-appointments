import AddressEntity from "./AddressEntity";
import UserSpecialismEntity from "./UserEspecialismEntity";
import UserRoleEntity from "./UserRoleEntity";

export default class UserEntity {
  private id: string | null;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date | null;

  private address: AddressEntity | null;
  private userSpecialisms: UserSpecialismEntity[] | null;
  private userRoles: UserRoleEntity[] | null;

  constructor(
    id: string | null,
    name: string,
    email: string,
    password: string,
    createdAt: Date | null,
    address: AddressEntity | null,
    userSpecialisms: UserSpecialismEntity[] | null,
    userRoles: UserRoleEntity[] | null
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.address = address;
    this.userSpecialisms = userSpecialisms;
    this.userRoles = userRoles;
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

  public getuserSpecialisms(): UserSpecialismEntity[] | null {
    return this.userSpecialisms;
  }

  public setuserSpecialisms(userSpecialism: UserSpecialismEntity[] | null) {
    this.userSpecialisms = userSpecialism;
  }

  public getAddress(): AddressEntity | null {
    return this.address;
  }

  public setAddress(address: AddressEntity | null) {
    this.address = address;
  }

  public getUserRoles(): UserRoleEntity[] | null {
    return this.userRoles;
  }

  public setUserRoles(userRole: UserRoleEntity[] | null) {
    this.userRoles = userRole;
  }
}
