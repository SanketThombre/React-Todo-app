import { TODO_LOADING,TODO_SUCCESS,TODO_FAILURE} from "./action";

const initState = {
    loading: false,
    error: false,
    todos:[]
}

export const todoreducer = (store = initState, { type, payload }) => {
    switch (type) {
        case TODO_LOADING:
            return { ...store, loading: true };
        case TODO_SUCCESS:
            return { ...store, loading: false, error: false, todos: [...payload] };
        case TODO_FAILURE:
            return { ...store, loading: false, error: true, todos: [] };
        default:
            return store;
    }
}