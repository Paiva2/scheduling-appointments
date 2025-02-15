import { AddressEntity, UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { IAddressRepository, IUserRepository, IUserSpecialismRepository } from "../../../interfaces/repository";
import { AddressNotFoundException, UserNotFoundException } from "../../common/exception";
import { IGetProfileInput } from "./dto/getProfileInput";
import { IGetProfileOutput } from "./dto/getProfileOutput";

export default class GetProfileUsecase implements IUsecase<IGetProfileInput, IGetProfileOutput> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly addressRepository: IAddressRepository,
    private readonly userSpecialismRepository: IUserSpecialismRepository
  ) {}

  public async execute(input: IGetProfileInput): Promise<IGetProfileOutput> {
    const user = await this.findUser(input.id);
    const userAddress = await this.findAddress(user);

    return this.mountOutput(user, userAddress);
  }

  private async findUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (user == null) {
      throw new UserNotFoundException("User not found!");
    }

    const isUserDoctor = user.getUserRoles()?.some((userRole) => userRole.getRoleEntity()?.getName() === "DOCTOR");

    if (isUserDoctor) {
      await this.getSpecialisms(user);
    }

    return user;
  }

  private async findAddress(user: UserEntity): Promise<AddressEntity> {
    const address = await this.addressRepository.findByUser(user.getId()!);

    if (address == null) {
      throw new AddressNotFoundException();
    }

    return address;
  }

  private async getSpecialisms(user: UserEntity): Promise<void> {
    const userSpecialisms = await this.userSpecialismRepository.getUserSpecialisms(user.getId()!);

    user.setuserSpecialisms(userSpecialisms);
  }

  private mountOutput(user: UserEntity, address: AddressEntity): IGetProfileOutput {
    return {
      id: user.getId()!,
      email: user.getEmail(),
      name: user.getName(),
      createdAt: user.getCreatedAt()!,
      roles:
        user.getUserRoles() === null
          ? []
          : user.getUserRoles()!.map((userRoles) => {
              return {
                name: userRoles.getRoleEntity()?.getName()!,
                roleId: userRoles.getRoleId(),
              };
            }),
      address: {
        id: address.getId()!,
        street: address.getStreet(),
        neighbourhood: address.getNeighbourhood(),
        state: address.getState(),
        city: address.getCity(),
        country: address.getCountry(),
        zipCode: address.getzipCode(),
        houseNumber: address.getHouseNumber(),
        complement: address.getComplement(),
      },
      specialisms:
        user.getuserSpecialisms() === null
          ? null
          : user.getuserSpecialisms()!.map((userSpecialism) => {
              return {
                id: userSpecialism.getSpecialismId()!,
                name: userSpecialism.getSpecialism()?.getName()!,
              };
            }),
    };
  }
}
