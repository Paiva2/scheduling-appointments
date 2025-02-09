export default class AddressEntity {
  private id: string | null;
  private street: string;
  private neighbourhood: string;
  private state: string;
  private city: string;
  private country: string;
  private zipCode: string;
  private houseNumber: string;
  private complement: string | null;
  private userId: string;
  private createdAt: Date | null;

  constructor(
    id: string | null,
    street: string,
    neighbourhood: string,
    state: string,
    city: string,
    country: string,
    zipCode: string,
    houseNumber: string,
    complement: string | null,
    userId: string,
    createdAt: Date | null
  ) {
    this.id = id;
    this.street = street;
    this.neighbourhood = neighbourhood;
    this.state = state;
    this.city = city;
    this.country = country;
    this.zipCode = zipCode;
    this.houseNumber = houseNumber;
    this.complement = complement;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  getId(): string | null {
    return this.id;
  }
  setId(id: string | null): void {
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

  getzipCode(): string {
    return this.zipCode;
  }
  setzipCode(zipCode: string): void {
    this.zipCode = zipCode;
  }

  getHouseNumber(): string {
    return this.houseNumber;
  }
  setHouseNumber(houseNumber: string): void {
    this.houseNumber = houseNumber;
  }

  getComplement(): string | null {
    return this.complement;
  }
  setComplement(complement: string | null): void {
    this.complement = complement;
  }

  getUserId(): string {
    return this.userId;
  }
  setUserId(userId: string): void {
    this.userId = userId;
  }

  getCreatedAt(): Date | null {
    return this.createdAt;
  }
  setCreatedAt(createdAt: Date | null): void {
    this.createdAt = createdAt;
  }
}
