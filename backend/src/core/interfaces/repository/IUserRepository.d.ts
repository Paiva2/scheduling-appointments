import UserEntity from "../../entity/UserEntity";

export interface IUserRepository {
  findUserByEmail(email: string): Promise<UserEntity | null>;

  findById(id: string): Promise<UserEntity | null>;

  persist(user: UserEntity): Promise<UserEntity>;

  findAllDoctors(
    page: number,
    size: number,
    specialismId: string | null,
    city: string | null
  ): Promise<IPageableList<UserEntity>>;
}
