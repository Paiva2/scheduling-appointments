import { UserSpecialismEntity } from "../../entity";

export interface IUserSpecialismRepository {
  persist(userSpecialismEntity: UserSpecialismEntity): Promise<UserSpecialismEntity>;

  getUserSpecialisms(id: string): Promise<UserSpecialismEntity[]>;

  persistAll(userSpecialismsEntity: UserSpecialismEntity[]);

  removeAllByUser(userId: string): Promise<void>;
}
