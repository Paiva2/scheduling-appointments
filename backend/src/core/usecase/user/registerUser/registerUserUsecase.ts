import UserAlreadyExistsException from "./exception/userAlreadyExistsException";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { IPasswordUtils } from "../../../interfaces/utils/IPasswordUtils";
import { IRegisterUserInput, IRegisterUserInputAddress } from "./dto/IRegisterUserInput";
import { InvalidFieldException, RoleNotFoundException } from "../../common/exception";
import { AddressEntity, RoleEntity, UserEntity, UserRoleEntity } from "../../../entity";
import { EnumRole } from "../../../enum";
import { IDatabaseUtils } from "../../../interfaces/utils/IDatabaseUtils";
import {
  IUserRepository,
  IAddressRepository,
  IRoleRepository,
  IUserRoleRepository,
} from "../../../interfaces/repository/index";

export default class RegisterUserUsecase implements IUsecase {
  private EMAIL_REGEX =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly addressRepository: IAddressRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly userRoleRepository: IUserRoleRepository,
    private readonly passwordUtils: IPasswordUtils,
    private readonly databaseUtils: IDatabaseUtils
  ) {}

  public async execute(input: IRegisterUserInput): Promise<void> {
    this.checkPasswordLength(input.password);
    this.checkEmailValid(input.email);

    await this.checkEmailAlreadyUsed(input.email);

    await this.hashPassword(input);
    let user = this.fillNewUser(input);

    try {
      await this.databaseUtils.beginTransaction();
      user = await this.saveUser(user);

      const address = this.fillNewAddress(user, input.address);
      await this.persistAddress(address);

      const role = await this.findRole();
      const userRole = this.fillUserRole(user, role);

      await this.persistUserRole(userRole);

      await this.databaseUtils.commitTransaction();
    } catch (e) {
      await this.databaseUtils.rollBackTransaction();
      throw e;
    }
  }

  private async checkEmailAlreadyUsed(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findUserByEmail(email);

    if (user != null) {
      throw new UserAlreadyExistsException("User with this e-mail already exists!");
    }

    return user;
  }

  private async hashPassword(input: IRegisterUserInput): Promise<void> {
    input.password = await this.passwordUtils.hash(input.password);
  }

  private checkPasswordLength(password: string): void {
    if (password.length < 6) {
      throw new InvalidFieldException("Password must have at least 6 characters.");
    }
  }

  private checkEmailValid(email: string) {
    if (!this.EMAIL_REGEX.test(email)) {
      throw new InvalidFieldException("Invalid e-mail format.");
    }
  }

  private fillNewUser(input: IRegisterUserInput): UserEntity {
    return new UserEntity(null, input.name, input.email, input.password, new Date());
  }

  private saveUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.persist(user);
  }

  private fillNewAddress(user: UserEntity, inputAddress: IRegisterUserInputAddress): AddressEntity {
    return new AddressEntity(
      null,
      inputAddress.street,
      inputAddress.neighbourhood,
      inputAddress.state,
      inputAddress.city,
      inputAddress.country,
      inputAddress.zipCode,
      inputAddress.houseNumber,
      inputAddress.complement,
      user.getId()!,
      null
    );
  }

  private async persistAddress(address: AddressEntity): Promise<void> {
    await this.addressRepository.persist(address);
  }

  private async findRole(): Promise<RoleEntity> {
    const role = await this.roleRepository.findRoleByName(EnumRole.USER.toString());

    if (role == null) {
      throw new RoleNotFoundException(`Role not found: ${EnumRole.USER.toString()}!`);
    }

    return role;
  }

  private fillUserRole(user: UserEntity, role: RoleEntity): UserRoleEntity {
    return new UserRoleEntity(user.getId()!, role.getId()!, null);
  }

  private async persistUserRole(userRole: UserRoleEntity): Promise<void> {
    await this.userRoleRepository.persist(userRole);
  }
}
