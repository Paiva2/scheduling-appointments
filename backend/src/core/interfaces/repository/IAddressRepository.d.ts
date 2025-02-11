import AddressEntity from "../../entity/AddressEntity";

export interface IAddressRepository {
  persist(address: AddressEntity): Promise<AddressEntity>;

  findByUser(userId: string): Promise<AddressEntity | null>;
}
