import AddressEntity from "../../../core/entity/AddressEntity";
import { IAddressRepository } from "../../../core/interfaces/repository/IAddressRepository";
import pool from "../database/postgres/connection";
import AddressMapper from "../mappers/addressMapper";

export default class AddressRepositoryPg implements IAddressRepository {
  public async persist(address: AddressEntity): Promise<AddressEntity> {
    const { rows } = await pool.query(
      `
        INSERT INTO tb_address (
            adr_street,
            adr_neighbourhood,
            adr_state,
            adr_city,
            adr_country,
            adr_zipcode,
            adr_house_number,
            adr_user_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `,
      [
        address.getStreet(),
        address.getNeighbourhood(),
        address.getState(),
        address.getCity(),
        address.getCountry(),
        address.getzipCode(),
        address.getHouseNumber(),
        address.getUserId(),
      ]
    );

    return AddressMapper.toDomain(rows[0])!;
  }
}
