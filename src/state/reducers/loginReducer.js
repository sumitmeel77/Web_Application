const reducer = (state = "general", action) => {
    if (action.type === "signed") { return action.payload }
    else { return state }
}
export default reducer