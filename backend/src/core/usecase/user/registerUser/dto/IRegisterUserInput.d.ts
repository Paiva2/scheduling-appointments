export interface IRegisterUserInput {
  email: string;
  name: string;
  password: string;
  address: IRegisterUserInputAddress;
}

export interface IRegisterUserInputAddress {
  street: string;
  neighbourhood: string;
  houseNumber: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  complement: string | null;
}
