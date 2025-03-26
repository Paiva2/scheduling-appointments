import { SchedulingEntity, UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { ISchedulingRepository, IUserRepository } from "../../../interfaces/repository";
import { IPageableList } from "../../../interfaces/utils/IPageableList";
import { UserNotFoundException } from "../../common/exception";
import ForbiddenException from "../../common/exception/core/forbiddenException";
import { IListDoctorSchedulingOutput } from "./dto/listDoctorSchedulingOutput";
import { IListDoctorSchedulingInput } from "./dto/listDoctorSchedulingsInput";

export class ListDoctorSchedulingsUsecase
  implements IUsecase<IListDoctorSchedulingInput, IPageableList<IListDoctorSchedulingOutput>>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly schedulingRepository: ISchedulingRepository
  ) {}

  public async execute(
    input: IListDoctorSchedulingInput
  ): Promise<IPageableList<IListDoctorSchedulingOutput>> {
    if (input.page < 1) {
      input.page = 1;
    }

    if (input.size < 15) {
      input.size = 15;
    } else if (input.size > 50) {
      input.size = 50;
    }

    const doctor = await this.findDoctor(input.id);
    const userSchedulings = await this.findSchedulings(doctor.getId()!, input);

    return this.mountOutput(userSchedulings);
  }

  private async findDoctor(id: string): Promise<UserEntity> {
    const doctor = await this.userRepository.findById(id);

    if (doctor === null) {
      throw new UserNotFoundException("Doctor not found!");
    }

    const isUserDoctor = doctor
      .getUserRoles()
      ?.some((userRole) => userRole.getRoleEntity()?.getName() === "DOCTOR");

    if (!isUserDoctor) {
      throw new ForbiddenException("Not allowed!");
    }

    return doctor;
  }

  private async findSchedulings(
    userId: string,
    input: IListDoctorSchedulingInput
  ): Promise<IPageableList<SchedulingEntity>> {
    return await this.schedulingRepository.findAllByDoctorId(userId, input.page, input.size);
  }

  private mountOutput(list: IPageableList<SchedulingEntity>): IPageableList<IListDoctorSchedulingOutput> {
    return {
      page: list.page,
      size: list.size,
      totalItems: list.totalItems,
      totalPages: list.totalPages,
      data: list.data.map((item) => {
        return {
          id: item.getId()!,
          informations: item.getInformations(),
          active: item.isActive(),
          scheduledAt: item.getScheduledAt(),
          finishedAt: item.getFinishedAt(),
          createdAt: item.getCreatedAt(),
          updatedAt: item.getUpdatedAt(),
          pacient: {
            id: item.getUser()!.getId()!,
            email: item.getUser()!.getEmail(),
            name: item.getUser()!.getName(),
            address: {
              street: item.getUser()!.getAddress()!.getStreet(),
              neighbourhood: item.getUser()!.getAddress()!.getNeighbourhood(),
              state: item.getUser()!.getAddress()!.getState(),
              city: item.getUser()!.getAddress()!.getCity(),
              country: item.getUser()!.getAddress()!.getCountry(),
              zipCode: item.getUser()!.getAddress()!.getzipCode(),
              houseNumber: item.getUser()!.getAddress()!.getHouseNumber(),
              complement: item.getUser()!.getAddress()!.getComplement(),
            },
          },
        };
      }),
    };
  }
}
