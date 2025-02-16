import UserAlreadyExistsException from "./exception/userAlreadyExistsException";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { IDatabaseUtils } from "../../../interfaces/utils/IDatabaseUtils";
import { IPasswordUtils } from "../../../interfaces/utils/IPasswordUtils";
import { IRegisterUserInput, IRegisterUserInputAddress } from "./dto/IRegisterUserInput";
import { EnumRole } from "../../../enum";
import {
  AddressEntity,
  RoleEntity,
  UserEntity,
  UserRoleEntity,
  SpecialismEntity,
  UserSpecialismEntity,
} from "../../../entity";
import { InvalidFieldException, RoleNotFoundException, SpecialismNotFoundException } from "../../common/exception";
import {
  IUserRepository,
  IAddressRepository,
  IRoleRepository,
  IUserRoleRepository,
  ISpecialismRepository,
  IUserSpecialismRepository,
} from "../../../interfaces/repository/index";
import { EnumSpecialism } from "../../../enum/EnumSpecialism";

export default class RegisterUserUsecase implements IUsecase<IRegisterUserInput, void> {
  private EMAIL_REGEX =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly addressRepository: IAddressRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly userRoleRepository: IUserRoleRepository,
    private readonly specialismRepository: ISpecialismRepository,
    private readonly userSpecialismRepository: IUserSpecialismRepository,
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

      const role = await this.findRole(input.role);
      const userRole = this.fillUserRole(user, role);

      await this.persistUserRole(userRole);

      if (input.role === "DOCTOR" && input.specialismListId !== null && input.specialismListId.length) {
        const specialismList = await this.findSpecialisms(input.specialismListId);
        const fillUserSpecialisms = this.fillUserSpecialisms(user, specialismList);
        await this.saveUserSpecialism(fillUserSpecialisms);
      }

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
    return new UserEntity(null, input.name, input.email, input.password, new Date(), null, null, null);
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

  private async findRole(role: EnumRole): Promise<RoleEntity> {
    const roleFound = await this.roleRepository.findRoleByName(role.toUpperCase());

    if (roleFound == null) {
      throw new RoleNotFoundException(`Role not found: ${role.toUpperCase()}!`);
    }

    return roleFound;
  }

  private fillUserRole(user: UserEntity, role: RoleEntity): UserRoleEntity {
    return new UserRoleEntity(user.getId()!, role.getId()!, null, null);
  }

  private async persistUserRole(userRole: UserRoleEntity): Promise<void> {
    await this.userRoleRepository.persist(userRole);
  }

  private async findSpecialisms(specialismName: string[]): Promise<SpecialismEntity[]> {
    const specialism = await this.specialismRepository.findSpecialismsId(specialismName);

    if (specialism == null) {
      throw new SpecialismNotFoundException();
    }

    return specialism;
  }

  private fillUserSpecialisms(user: UserEntity, specialismList: SpecialismEntity[]): UserSpecialismEntity[] {
    const specialisms = [];

    for (let specialism of specialismList) {
      specialisms.push(new UserSpecialismEntity(user.getId(), specialism.getId(), null, user, null));
    }

    return specialisms;
  }

  private async saveUserSpecialism(userSpecialisms: UserSpecialismEntity[]): Promise<void> {
    await this.userSpecialismRepository.persistAll(userSpecialisms);
  }
}
