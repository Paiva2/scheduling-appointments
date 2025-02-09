export default class AddressEntity {
  private id: string;
  private street: string;
  private neighbourhood: string;
  private state: string;
  private city: string;
  private country: string;
  private zipcode: string;
  private houseNumber: string;
  private userId: string;
  private createdAt: Date;

  constructor(
    id: string,
    street: string,
    neighbourhood: string,
    state: string,
    city: string,
    country: string,
    zipcode: string,
    houseNumber: string,
    userId: string,
    createdAt: Date
  ) {
    this.id = id;
    this.street = street;
    this.neighbourhood = neighbourhood;
    this.state = state;
    this.city = city;
    this.country = country;
    this.zipcode = zipcode;
    this.houseNumber = houseNumber;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  getId(): string {
    return this.id;
  }
  setId(id: string): void {
    this.id = id;
  }

  getStreet(): string {
    return this.street;
  }
  setStreet(street: string): void {
    this.street = street;
  }

  getNeighbourhood(): string {
    return this.neighbourhood;
  }
  setNeighbourhood(neighbourhood: string): void {
    this.neighbourhood = neighbourhood;
  }

  getState(): string {
    return this.state;
  }
  setState(state: string): void {
    this.state = state;
  }

  getCity(): string {
    return this.city;
  }
  setCity(city: string): void {
    this.city = city;
  }

  getCountry(): string {
    return this.country;
  }
  setCountry(country: string): void {
    this.country = country;
  }

  getZipcode(): string {
    return this.zipcode;
  }
  setZipcode(zipcode: string): void {
    this.zipcode = zipcode;
  }

  getHouseNumber(): string {
    return this.houseNumber;
  }
  setHouseNumber(houseNumber: string): void {
    this.houseNumber = houseNumber;
  }

  getUserId(): string {
    return this.userId;
  }
  setUserId(userId: string): void {
    this.userId = userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }
}
