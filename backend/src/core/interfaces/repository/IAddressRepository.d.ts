import AddressEntity from "../../entity/AddressEntity";

export interface IAddressRepository {
  persist(address: AddressEntity): Promise<AddressEntity>;
}
