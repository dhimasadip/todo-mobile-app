
export const getTodos = (todos) => {
    return (dispatch) => {
        dispatch({
            type: 'GET_TODOS',
            payload: {
                todos
            }
        })
    }
}


export const addTodo = (todo) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TODO',
            payload: {
                todo
            }
        })
    }
}

export const editTodoStatus = ({ id, status }) => {
    return (dispatch) => {
        dispatch({
            type: 'EDIT_STATUS',
            payload: {
                id, status
            }
        })
    }
}

export const editTodoPriority = ({ id, priority }) => {
    return (dispatch) => {
        dispatch({
            type: 'EDIT_PRIORITY',
            payload: {
                id, priority
            }
        })
    }
}