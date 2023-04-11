import {combineReducers} from "redux";
import auth from './auth.reducer';
import uiReducer from "./ui.reducer";
import tasksReducer from './tasks.reducer'

const initialState = {
    msg: 'hello from the redux store!'
}

const initialReducer = (state=initialState) => {
    return state;
}

export default combineReducers({
    auth: auth,
    ui: uiReducer,
    tasks: tasksReducer
});