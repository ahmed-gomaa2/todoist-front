import {CLOSE_CREATE_PROJECT, OPEN_SIDEBAR, TOGGLE_CREATE_PROJECT, TOGGLE_CREATE_TASK} from "./types.actions";

export const toggleSidebar = () => {
    return {
        type: OPEN_SIDEBAR
    }
}

export const toggleCreateProject = () => {
    return {
        type: TOGGLE_CREATE_PROJECT
    }
}

export const toggleCreateTask = (category) => {
    return {
        type: TOGGLE_CREATE_TASK,
        payload: category
    }
}