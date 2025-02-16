import { UserEntity } from "../../../entity";
import { IUsecase } from "../../../interfaces/adapter/IUsecase";
import { IUserRepository } from "../../../interfaces/repository";
import { IPageableList } from "../../../interfaces/utils/IPageableList";
import { IListDoctorsInput } from "./dto/listDoctorsInput";
import { IListDoctorsOutput } from "./dto/listDoctorsOutput";

export default class ListDoctorsUsecase implements IUsecase<IListDoctorsInput, IPageableList<IListDoctorsOutput>> {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(input: IListDoctorsInput): Promise<IPageableList<IListDoctorsOutput>> {
    if (input.page < 1) {
      input.page = 1;
    }

    if (input.size < 5) {
      input.size = 5;
    } else if (input.size > 50) {
      input.size = 50;
    }

    const doctors = await this.findAllDoctors(input);

    return this.mountOutput(doctors);
  }

  private async findAllDoctors(input: IListDoctorsInput): Promise<IPageableList<UserEntity>> {
    return this.userRepository.findAllDoctors(input.page, input.size, input.specialism, input.state);
  }

  private mountOutput(doctors: IPageableList<UserEntity>): IPageableList<IListDoctorsOutput> {
    return {
      page: doctors.page,
      size: doctors.size,
      totalItems: doctors.totalItems,
      totalPages: doctors.totalPages,
      data: doctors.data.map((doctor) => {
        return {
          id: doctor.getId()!,
          name: doctor.getName(),
          email: doctor.getEmail(),
          createdAt: doctor.getCreatedAt()!,
          address: {
            id: doctor.getAddress()?.getId()!,
            street: doctor.getAddress()?.getStreet()!,
            neighbourhood: doctor.getAddress()?.getNeighbourhood()!,
            state: doctor.getAddress()?.getState()!,
            city: doctor.getAddress()?.getCity()!,
            country: doctor.getAddress()?.getCountry()!,
            zipCode: doctor.getAddress()?.getzipCode()!,
            houseNumber: doctor.getAddress()?.getHouseNumber()!,
            complement: doctor.getAddress()?.getComplement()!,
          },
          specialismList: doctor.getuserSpecialisms()!.map((specialism) => {
            return {
              id: specialism.getSpecialism()?.getId()!,
              name: specialism.getSpecialism()?.getName()!,
            };
          }),
        };
      }),
    };
  }
}
