import * as actionTypes from '../actions/types.actions';

const initialState = {
    toggleSidebar: false,
    toggleCreateProjectModel:false,
    toggleCreateTaskForm: {
        todo: false,
        inProgress: false,
        completed: false
    }
}

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_SIDEBAR:
            return {
                ...state,
                toggleSidebar: !state.toggleSidebar
            }
        case actionTypes.TOGGLE_CREATE_PROJECT:
            return {
                ...state,
                toggleCreateProjectModel: !state.toggleCreateProjectModel
            }
        case actionTypes.TOGGLE_CREATE_TASK:
            const formObject = {...state.toggleCreateTaskForm};
            formObject[action.payload] = !formObject[action.payload];
            return {
                ...state,
                toggleCreateTaskForm: formObject
            }
        default:
            return state;
    }
}