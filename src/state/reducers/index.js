import { combineReducers } from "redux";
import loginReducer from "./loginReducer"

const reducers = combineReducers({
    loginData: loginReducer
})

export default reducers