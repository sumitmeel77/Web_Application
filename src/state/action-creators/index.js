export const AuthFunc = (login) => {
    return (dispatch) => {
        dispatch({
            type: "signed",
            payload: login
        })
    }
}