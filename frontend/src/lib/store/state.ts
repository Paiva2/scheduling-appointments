import type { IState } from "./types/stateTypes";

export const state: IState = {
  auth: {
    token: null,
    subject: null,
  },
};

export type State = typeof state;
