import { AddressEntity, SpecialismEntity, UserEntity, UserSpecialismEntity } from "../../../entity";
import { EnumRole } from "../../../enum";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import {
  IAddressRepository,
  ISpecialismRepository,
  IUserRepository,
  IUserSpecialismRepository,
} from "../../../interfaces/repository";
import { IDatabaseUtils } from "../../../interfaces/utils/IDatabaseUtils";
import { IPasswordUtils } from "../../../interfaces/utils/IPasswordUtils";
import {
  AddressNotFoundException,
  UserNotFoundException,
  UserAlreadyExistsException,
  InvalidFieldException,
} from "../../common/exception";
import { IUpdateProfileInput } from "./dto/UpdateProfileInput";

export default class UpdateProfileUsecase implements IUsecase<IUpdateProfileInput, void> {
  private EMAIL_REGEX =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly addressRepository: IAddressRepository,
    private readonly userSpecialismRepository: IUserSpecialismRepository,
    private readonly specialismRepository: ISpecialismRepository,
    private readonly passwordUtils: IPasswordUtils,
    private readonly databaseUtils: IDatabaseUtils
  ) {}

  public async execute(input: IUpdateProfileInput, userId: string): Promise<void> {
    this.handleInput(input);

    let user = await this.findUser(userId);
    await this.fillUser(input, user);

    let address = await this.findUserAddress(user.getId()!);
    this.fillAddress(input, address);

    try {
      await this.databaseUtils.beginTransaction();

      await this.persistUpdatedUser(user);
      await this.persistUpdatedAddress(address);

      await this.handleSpecialismChanges(input, user);

      await this.databaseUtils.commitTransaction();
    } catch (e) {
      await this.databaseUtils.rollBackTransaction();
      throw e;
    }
  }

  private handleInput(input: IUpdateProfileInput): void {
    if (input.password && input.password.length < 6) {
      throw new InvalidFieldException("Password must have at least 6 characters.");
    }

    if (!this.EMAIL_REGEX.test(input.email)) {
      throw new InvalidFieldException("Invalid e-mail format.");
    }
  }

  private async findUser(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException("User not found!");
    }

    return user;
  }

  private async fillUser(input: IUpdateProfileInput, user: UserEntity): Promise<void> {
    user.setName(input.name);

    if (input.password) {
      const hashPassword = await this.hashPassword(input.password);
      user.setPassword(hashPassword);
    }

    if (input.email !== user.getEmail()) {
      await this.checkEmailAlreadyUsed(input.email);
      user.setEmail(input.email);
    }
  }

  private async hashPassword(rawPassword: string): Promise<string> {
    return await this.passwordUtils.hash(rawPassword);
  }

  private async checkEmailAlreadyUsed(email: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);

    if (user) {
      throw new UserAlreadyExistsException("Email already being used: " + email);
    }
  }

  private async persistUpdatedUser(user: UserEntity): Promise<void> {
    await this.userRepository.persist(user);
  }

  private async findUserAddress(userId: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findByUser(userId);

    if (!address) {
      throw new AddressNotFoundException();
    }

    return address;
  }

  private fillAddress(input: IUpdateProfileInput, address: AddressEntity): void {
    address.setStreet(input.address.street);
    address.setNeighbourhood(input.address.neighbourhood);
    address.setzipCode(input.address.zipCode);
    address.setState(input.address.state);
    address.setCity(input.address.city);
    address.setHouseNumber(input.address.houseNumber);
    address.setComplement(input.address.complement);
  }

  private async persistUpdatedAddress(address: AddressEntity): Promise<void> {
    await this.addressRepository.persist(address);
  }

  private async handleSpecialismChanges(input: IUpdateProfileInput, user: UserEntity): Promise<void> {
    const isUserDoctor = user
      .getUserRoles()
      ?.some((userRole) => userRole.getRoleEntity()?.getName() === EnumRole.DOCTOR.toString());

    if (!isUserDoctor) return;

    if (!input.specialisms.length) {
      throw new InvalidFieldException("Specialisms can't be empty!");
    }

    const userSpecialisms = await this.findUserSpecialisms(user.getId()!);
    const currentSpecialismsId = userSpecialisms.map((userSpecialism) => userSpecialism.getSpecialismId());

    const hasChangedCurrentSpecialisms = input.specialisms?.length !== currentSpecialismsId.length;
    const hasAddedOrRemovedSpecialism = input.specialisms?.some(
      (specialismId) => !currentSpecialismsId.includes(specialismId)
    );

    if (hasChangedCurrentSpecialisms || hasAddedOrRemovedSpecialism) {
      await this.removeAllSpecialisms(user.getId()!);

      const specialisms = await this.specialismRepository.findSpecialismsId(input.specialisms);

      const userSpecialisms = this.fillUserSpecialisms(user, specialisms);

      await this.userSpecialismRepository.persistAll(userSpecialisms);
    }
  }

  private async findUserSpecialisms(userId: string): Promise<UserSpecialismEntity[]> {
    return await this.userSpecialismRepository.getUserSpecialisms(userId);
  }

  private async removeAllSpecialisms(userId: string): Promise<void> {
    await this.userSpecialismRepository.removeAllByUser(userId);
  }

  private fillUserSpecialisms(user: UserEntity, specialisms: SpecialismEntity[]): UserSpecialismEntity[] {
    const userSpecialisms: UserSpecialismEntity[] = [];

    for (let specialism of specialisms) {
      const userSpecialism = new UserSpecialismEntity(user.getId(), specialism.getId(), null, null, null);
      userSpecialisms.push(userSpecialism);
    }

    return userSpecialisms;
  }
}
