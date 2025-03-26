export interface IListUserSchedulingOutput {
  id: string;
  doctor: {
    id: string;
    email: string;
    name: string;
    address: {
      street: string;
      neighbourhood: string;
      state: string;
      city: string;
      country: string;
      zipCode: string;
      houseNumber: string;
      complement: string | null;
    };
    specialisms: {
      id: string;
      name: string;
    }[];
  };
  informations: string | null;
  active: boolean;
  scheduledAt: Date;
  finishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
