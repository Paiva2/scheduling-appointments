export const actionTypes = {
  USER: {
    LOGIN: "login",
    REGISTER: "register",
    PROFILE: "profile",
    UPDATE_PROFILE: "updateProfile",
    FORGOT_PASSWORD: "forgotPassword",
  },
  LIST: {
    GET_DOCTORS: "getDoctors",
  },
  SPECIALISM: {
    GET_SPECIALISMS: "getSpecialisms",
  },
  GET_STATES: "getStates",
  GET_ZIPCODE_INFOS: "getZipcodeInfos",
  SCHEDULING: {
    CREATE: "createScheduling",
    GET_USER_SCHEDLINGS: "getUserSchedulings",
    GET_DOCTOR_SCHEDLINGS: "getDoctorSchedulings",
    CANCEL_SCHEDULING: "cancelScheduling",
  },
};
