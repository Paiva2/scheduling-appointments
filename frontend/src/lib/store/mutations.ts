import { mutationTypes } from "./types/mutationTypes";
import type { IState } from "./types/stateTypes";

const mutations = {
  [mutationTypes.USER.SET_AUTH](state: IState, payload) {
    state.authToken = payload;
  },

  [mutationTypes.USER.SET_PROFILE](state: IState, payload) {
    state.user = payload;
  },
};

export default mutations;
