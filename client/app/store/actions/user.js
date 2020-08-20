
export const getUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: 'GET_USER',
            payload: {
                user
            }
        })
    }
}