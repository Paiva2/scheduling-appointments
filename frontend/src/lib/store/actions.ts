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
    const { data } = await api.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${payload}/municipios`
    );
    return data;
  },

  async [actionTypes.GET_ZIPCODE_INFOS]({ commit, state }, payload) {
    const { data } = await api.get(`https://viacep.com.br/ws/${payload}/json/`);
    return data;
  },

  async [actionTypes.SCHEDULING.CREATE]({ commit, state }, payload) {
    await api.post("/schedulings/new", payload, {
      headers: {
        Authorization: `Bearer ${state.authToken}`,
      },
    });
  },

  async [actionTypes.SCHEDULING.GET_USER_SCHEDLINGS]({ commit, state }, payload) {
    let url = "/schedulings/pacient/list";

    if (payload.page) {
      url += `?page=${payload.page}`;
    }

    if (payload.size) {
      url += `&size=${payload.size}`;
    }

    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${state.authToken}`,
      },
    });

    return data;
  },

  async [actionTypes.SCHEDULING.GET_DOCTOR_SCHEDLINGS]({ commit, state }, payload) {
    let url = "/schedulings/doctor/list";

    if (payload.page) {
      url += `?page=${payload.page}`;
    }

    if (payload.size) {
      url += `&size=${payload.size}`;
    }

    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${state.authToken}`,
      },
    });

    return data;
  },

  async [actionTypes.SCHEDULING.CANCEL_SCHEDULING]({ commit, state }, payload) {
    const cancelType = payload.isDoctor ? "doctor" : "pacient";
    let url = `/schedulings/${cancelType}/cancel/` + payload.schedulingId;

    const { data } = await api.delete(url, {
      headers: {
        Authorization: `Bearer ${state.authToken}`,
      },
    });

    return data;
  },
};

export default actions;
