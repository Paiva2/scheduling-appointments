import api from "@/plugins/axios";
import { actionTypes } from "./types/actionTypes";
import { mutationTypes } from "./types/mutationTypes";
import type { Commit } from "vuex/types/index.js";
import type { IState } from "./types/stateTypes";

const actions = {
  async [actionTypes.USER.LOGIN]({ commit, state }, payload) {
    const { data } = await api.post("/user/login", payload);
    commit(mutationTypes.USER.SET_AUTH, data.token);
    return data;
  },

  async [actionTypes.USER.REGISTER](
    {
      commit,
      state,
    }: {
      commit: Commit;
      state: IState;
    },
    payload
  ) {
    const { data } = await api.post("/user/register", payload);

    return data;
  },

  async [actionTypes.USER.FORGOT_PASSWORD]({ commit, state }, payload) {
    const { data } = await api.post("/user/forgot-password", payload);
    return data;
  },

  async [actionTypes.USER.PROFILE]({ commit, state }: { commit: Commit; state: IState }) {
    const { data } = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${state.authToken}`,
      },
    });

    commit(mutationTypes.USER.SET_PROFILE, data);
    return data;
  },

  async [actionTypes.USER.UPDATE_PROFILE]({ commit, state }: { commit: Commit; state: IState }, payload) {
    const { data } = await api.put("/user/profile/update", payload, {
      headers: {
        Authorization: `Bearer ${state.authToken}`,
      },
    });
    return data;
  },

  async [actionTypes.LIST.GET_DOCTORS]({ commit, state }, payload) {
    const { data } = await api.get(
      `/user/list/doctors?page=${payload.page}&size=${payload.size}&state=${payload.state}&specialism=${payload.specialism}`,
      {
        headers: {
          Authorization: `Bearer ${state.authToken}`,
        },
      }
    );

    return data;
  },

  async [actionTypes.SPECIALISM.GET_SPECIALISMS]({ commit, state }) {
    const { data } = await api.get(`/specialism/list`);
    return data;
  },

  async [actionTypes.GET_STATES]({ commit, state }, payload) {
    const { data } = await api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${payload}/municipios`);
    return data;
  },

  async [actionTypes.GET_ZIPCODE_INFOS]({ commit, state }, payload) {
    const { data } = await api.get(`https://viacep.com.br/ws/${payload}/json/`);
    return data;
  },
};

export default actions;
