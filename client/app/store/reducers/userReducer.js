const initialState = {
    user: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_USER':
            return {...state, user: payload.user}
        default:
            return state
    }
}