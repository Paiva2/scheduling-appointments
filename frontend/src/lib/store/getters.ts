import type { IState } from "./types/stateTypes";

const getters = {
  getAuthToken(state: IState) {
    return state.authToken;
  },
  isDoctor(state: IState) {
    return state.user.roles.some((role) => role.name === "DOCTOR");
  },
};

export default getters;
