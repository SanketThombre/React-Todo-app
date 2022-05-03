import { REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_LOADING } from "./action";

const initState = {
    error: false,
    loading: false,
    username: "",
    password: "",
}

export const registerreducer = (store= initState, { type, payload }) => {
    
    switch (type) {
        case REGISTER_SUCCESS:
            return {...store, username: payload.username, password: payload.password,loading:false, error: false}
        case REGISTER_LOADING:
            return { ...store, loadin: true };
        case REGISTER_ERROR:
            return { ...store, error:true, loading: false,username:"",password:""}
    
        default:
            return store;
    }
}