
import { LOGIN_LOADING,LOGIN_FAILURE,LOGIN_SUCCESS ,LOGOUT} from "./action"


const initState = {
    error: false,
    isauthenticated: false,
    loading: false,
    token: '',
    username: ""

}


export const loginreducer = (store=initState, { type,payload}) => {
    
    switch (type) {
        case LOGIN_LOADING:
            return { ...store, loading: true }
            case LOGIN_SUCCESS:
            return {
                ...store, loading: false, error: false, isauthenticated: true,
                token: payload.token,username: payload.username
            }
            case LOGIN_FAILURE:
            return { ...store, error: true ,loading: false,isauthenticated: false,token:"",username: ""}
        
        case LOGOUT:
            return { ...initState };
        default:
            return store;
    }
}