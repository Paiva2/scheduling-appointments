export interface IGetProfileOutput {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  address: {
    id: string;
    street: string;
    neighbourhood: string;
    state: string;
    city: string;
    country: string;
    zipCode: string;
    houseNumber: string;
    complement: string | null;
  };
  roles: Array<{
    roleId: string;
    name: string;
  }>;
  specialisms: Array<{
    id: string;
    name: string;
  }> | null;
}
