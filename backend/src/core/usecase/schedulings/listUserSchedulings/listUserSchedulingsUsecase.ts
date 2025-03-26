import { SchedulingEntity, UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { ISchedulingRepository, IUserRepository } from "../../../interfaces/repository";
import { IPageableList } from "../../../interfaces/utils/IPageableList";
import { UserNotFoundException } from "../../common/exception";
import { IListUserSchedulingOutput } from "./dto/listUserSchedulingOutput";
import { IListUserSchedulingInput } from "./dto/listUserSchedulingsInput";

export class ListUserSchedulingsUsecase
  implements IUsecase<IListUserSchedulingInput, IPageableList<IListUserSchedulingOutput>>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly schedulingRepository: ISchedulingRepository
  ) {}

  public async execute(input: IListUserSchedulingInput): Promise<IPageableList<IListUserSchedulingOutput>> {
    if (input.page < 1) {
      input.page = 1;
    }

    if (input.size < 15) {
      input.size = 15;
    } else if (input.size > 50) {
      input.size = 50;
    }

    const user = await this.findUser(input.id);
    const userSchedulings = await this.findSchedulings(user.getId()!, input);

    return this.mountOutput(userSchedulings);
  }

  private async findUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (user === null) {
      throw new UserNotFoundException("User not found!");
    }

    return user;
  }

  private async findSchedulings(
    userId: string,
    input: IListUserSchedulingInput
  ): Promise<IPageableList<SchedulingEntity>> {
    return await this.schedulingRepository.findAllByUserId(userId, input.page, input.size);
  }

  private mountOutput(list: IPageableList<SchedulingEntity>): IPageableList<IListUserSchedulingOutput> {
    return {
      page: list.page,
      size: list.size,
      totalItems: list.totalItems,
      totalPages: list.totalPages,
      data: list.data.map((item) => {
        return {
          id: item.getId()!,
          doctor: {
            id: item.getUserDoctor()!.getId()!,
            email: item.getUserDoctor()!.getEmail(),
            name: item.getUserDoctor()!.getName(),
            address: {
              street: item.getUserDoctor()!.getAddress()!.getStreet(),
              neighbourhood: item.getUserDoctor()!.getAddress()!.getNeighbourhood(),
              state: item.getUserDoctor()!.getAddress()!.getState(),
              city: item.getUserDoctor()!.getAddress()!.getCity(),
              country: item.getUserDoctor()!.getAddress()!.getCountry(),
              zipCode: item.getUserDoctor()!.getAddress()!.getzipCode(),
              houseNumber: item.getUserDoctor()!.getAddress()!.getHouseNumber(),
              complement: item.getUserDoctor()!.getAddress()!.getComplement(),
            },
            specialisms: item
              .getUserDoctor()!
              .getuserSpecialisms()!
              .map((doctorSpecialism) => {
                return {
                  id: doctorSpecialism.getSpecialism()!.getId()!,
                  name: doctorSpecialism.getSpecialism()!.getName(),
                };
              }),
          },
          informations: item.getInformations(),
          active: item.isActive(),
          scheduledAt: item.getScheduledAt(),
          finishedAt: item.getFinishedAt(),
          createdAt: item.getCreatedAt(),
          updatedAt: item.getUpdatedAt(),
        };
      }),
    };
  }
}
