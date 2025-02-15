import type { IState } from "./types/stateTypes";

export const state: IState = {
  authToken: null,
  user: {
    id: null,
    email: null,
    name: null,
    createdAt: null,
    roles: [],
    specialisms: [],
    address: {
      id: null,
      street: null,
      neighbourhood: null,
      state: null,
      city: null,
      country: null,
      zipCode: null,
      houseNumber: null,
      complement: null,
    },
  },
};

export type State = typeof state;
