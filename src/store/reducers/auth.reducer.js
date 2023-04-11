import * as actionTypes from '../actions/types.actions';

const initialState = {
    user: null,
    isAuthenticated: false,
    loadingUser: true,
    token: localStorage.getItem('token'),
    error: {
        type: '',
        msg: null
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_USER_START:
            return {
                ...state,
                loadingUser: true,
                error: {
                    type: '',
                    msg: null
                }
            }
        case actionTypes.REGISTER_USER_END:
            return {
                ...state,
                loadingUser: false
            }
        case actionTypes.REGISTER_USER_SUCCESS:
        case actionTypes.LOGIN_USER_SUCCESS:
            localStorage.setItem('token', action.token);
            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                error: {
                    type: '',
                    msg: null
                }
            }
        case actionTypes.REGISTER_USER_FAIL:
        case actionTypes.LOGIN_USER_FAIL:
            return {
                ...state,
                error: {
                    type: action.error.type,
                    msg: action.error.msg
                }
            }
        case actionTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
                error: {
                    type: '',
                    msg: null
                }
            }
        case actionTypes.LOG_USER_OUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                error: {
                    type: '',
                    msg: null
                }
            }
        default:
            return state;
    }
}