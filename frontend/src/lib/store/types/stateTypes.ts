export interface IState {
  authToken: string | null;
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
    createdAt: Date | null;
    roles: Array<{
      name: string;
      roleId: string;
    }>;
    specialisms: Array<{
      id: string;
      name: string;
    }> | null;
    address: {
      id: string | null;
      street: string | null;
      neighbourhood: string | null;
      state: string | null;
      city: string | null;
      country: string | null;
      zipCode: string | null;
      houseNumber: string | null;
      complement: string | null;
    };
  };
}
