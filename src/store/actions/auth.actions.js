import axios from 'axios';
import setHeadersHelper from "../../utls/set.headers.helper";
import {
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS, LOG_USER_OUT_FAIL, LOG_USER_OUT_SUCCESS, LOGIN_USER_SUCCESS,
    REGISTER_USER_END,
    REGISTER_USER_FAIL,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS
} from "./types.actions";
import {getProjects} from "./tasks.actions";

const loadUserStart = () => {
    return {
        type: REGISTER_USER_START
    }
}

const loadUserEnd = () => {
    return {
        type: REGISTER_USER_END
    }
}

export const loadUser = () => async dispatch => {
    try{
        dispatch(loadUserStart());
        const token = localStorage.token;
        setHeadersHelper(token);

        const user = await axios.get('/server/get-user');
        dispatch({
            type: LOAD_USER_SUCCESS,
            user: user.data
        });

        await dispatch(getProjects());
        dispatch(loadUserEnd());
    }catch (e) {
        dispatch({
            type: LOAD_USER_FAIL,
            error: e.response.data.error
        });
        dispatch(loadUserEnd());
    }
}

export const register = data => async dispatch => {
    try {
        const user = await axios.post('/server/register', data);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            token: user.data.token
        });
        dispatch(loadUser());
    }catch (e) {
        dispatch({
            type: REGISTER_USER_FAIL,
            error: e.response.data.error
        })
    }
}

export const login = data => async dispatch => {
    try {
        const user = await axios.post('/server/login', data);
        dispatch({
            type: LOGIN_USER_SUCCESS,
            token: user.data.token
        });
        dispatch(loadUser());
    }catch (e) {
        dispatch({
            type: REGISTER_USER_FAIL,
            error: e.response.data.error
        });
    }
}

export const logout = () => async dispatch => {
    try {
        const loggedOut = await axios.get('/server/logout');
        dispatch({
            type: LOG_USER_OUT_SUCCESS
        });
    }catch (e) {
        dispatch({
            type: LOG_USER_OUT_FAIL,
            error: e.response.data.error
        });
    }
}















