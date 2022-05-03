
export const REGISTER_LOADING = "REGISTER_LOADING";

export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";


export const registerloading = () => ({ type: "REGISTER_LOADING" });

export const registererror = () => ({ type: "REGISTER_ERROR" });

export const registersuccess= (payload) => ({ type: "REGISTER_SUCCESS",payload });