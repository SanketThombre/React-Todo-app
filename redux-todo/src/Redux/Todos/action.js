

export const TODO_LOADING = "TODO_LOADING";
export const TODO_SUCCESS = "TODO_SUCCESS";
export const TODO_FAILURE = "TODO_FAILURE";
 

export const todoloading = () => (
    {type: "TODO_LOADING"}
)

export const todosuccess = (payload) => (
    {type: "TODO_SUCCESS",payload}
) 

export const todofailure = () => (
    {type: "TODO_FAILURE"}
)

export const gettododata = () => (dispatch) => {
    dispatch(todoloading());

    fetch("http://localhost:8000/todos")
        .then((res) => res.json())
        .then((res) => dispatch(todosuccess(res)))
    .catch((err) => dispatch(todofailure()))
}

