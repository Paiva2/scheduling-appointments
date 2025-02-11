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

  public getId(): string | null {
    return this.id;
  }
  public setId(id: string | null): void {
    this.id = id;
  }

  public getStreet(): string {
    return this.street;
  }
  public setStreet(street: string): void {
    this.street = street;
  }

  public getNeighbourhood(): string {
    return this.neighbourhood;
  }
  public setNeighbourhood(neighbourhood: string): void {
    this.neighbourhood = neighbourhood;
  }

  public getState(): string {
    return this.state;
  }
  public setState(state: string): void {
    this.state = state;
  }

  public getCity(): string {
    return this.city;
  }
  public setCity(city: string): void {
    this.city = city;
  }

  public getCountry(): string {
    return this.country;
  }
  public setCountry(country: string): void {
    this.country = country;
  }

  public getzipCode(): string {
    return this.zipCode;
  }
  public setzipCode(zipCode: string): void {
    this.zipCode = zipCode;
  }

  public getHouseNumber(): string {
    return this.houseNumber;
  }
  public setHouseNumber(houseNumber: string): void {
    this.houseNumber = houseNumber;
  }

  public getComplement(): string | null {
    return this.complement;
  }
  public setComplement(complement: string | null): void {
    this.complement = complement;
  }

  public getUserId(): string {
    return this.userId;
  }
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getCreatedAt(): Date | null {
    return this.createdAt;
  }
  public setCreatedAt(createdAt: Date | null): void {
    this.createdAt = createdAt;
  }
}
