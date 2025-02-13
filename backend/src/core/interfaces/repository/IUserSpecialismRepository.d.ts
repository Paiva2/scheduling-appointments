import { UserSpecialismEntity } from "../../entity";

export interface IUserSpecialismRepository {
  persist(userSpecialismEntity: UserSpecialismEntity): Promise<UserSpecialismEntity>;
}
