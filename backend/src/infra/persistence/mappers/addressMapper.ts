import AddressEntity from "../../../core/entity/AddressEntity";
import { IAddress } from "../entity/IAddress";

export default class AddressMapper {
  public static toDomain(address: IAddress): AddressEntity | null {
    if (address == null) return null;

    return new AddressEntity(
      address.adr_id,
      address.adr_street,
      address.adr_neighbourhood,
      address.adr_state,
      address.adr_city,
      address.adr_country,
      address.adr_zipcode,
      address.adr_house_number,
      address.adr_complement,
      address.adr_user_id,
      address.adr_created_at
    );
  }
}
