import { AddressEntity, UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { IAddressRepository, IUserRepository } from "../../../interfaces/repository";
import { AddressNotFoundException, UserNotFoundException } from "../../common/exception";
import { IGetProfileInput } from "./dto/getProfileInput";
import { IGetProfileOutput } from "./dto/getProfileOutput";

export default class GetProfileUsecase implements IUsecase<IGetProfileInput, IGetProfileOutput> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly addressRepository: IAddressRepository
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

    return user;
  }

  private async findAddress(user: UserEntity): Promise<AddressEntity> {
    const address = await this.addressRepository.findByUser(user.getId()!);

    if (address == null) {
      throw new AddressNotFoundException();
    }

    return address;
  }

  private mountOutput(user: UserEntity, address: AddressEntity): IGetProfileOutput {
    return {
      id: user.getId()!,
      email: user.getEmail(),
      name: user.getName(),
      createdAt: user.getCreatedAt()!,
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
    };
  }
}
