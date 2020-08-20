const inititalState = {
    todos: []
}

export default (state = inititalState, { type, payload }) => {
    switch (type) {
        case 'GET_TODOS':
            return { ...state, todos: payload.todos }
        case 'ADD_TODO':
            return { ...state, todos: state.todos.concat(payload.todo) }
        case 'EDIT_STATUS':
            let { id, status } = payload
            const newTodos = state.todos.map(todo => {
                let duplicate = {...todo}
                if (duplicate._id == id) {
                    duplicate.status = status
                }
                return duplicate
            })

            return { ...state, todos: newTodos }
        case 'EDIT_PRIORITY':
            let { id: todoId, priority } = payload
            const newTodo = state.todos.map(todo => {
                let duplicated = {...todo}
                if (duplicated._id == todoId) {
                    duplicated.priority = priority
                }
                return duplicated
            })

            return { ...state, todos: newTodo }
        default:
            return state
    }
}