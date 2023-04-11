import axios from 'axios';
import {
    ADD_TASK_TO_UI_SUCCESS,
    CHANGE_TASK_CATEGORY__FAIL, CHANGE_TASK_CATEGORY_SUCCESS,
    CREATE_NEW_TASK_FAIL,
    CREATE_NEW_TASK_SUCCESS,
    CREATE_PROJECT_FAIL,
    CREATE_PROJECT_SUCCESS, CREATING_TASK_END, CREATING_TASK_START,
    DELETE_PROJECT_FAIL,
    DELETE_PROJECT_SUCCESS,
    DELETE_TASK_FAIL,
    DELETE_TASK_SUCCESS, EDIT_PROJECT_FAIL, EDIT_PROJECT_SUCCESS, EDIT_TASK_FAIL, EDIT_TASK_SUCCESS,
    END_SETTING_CURRENT_PROJECT,
    GET_ALL_TASKS_FAIL,
    GET_ALL_TASKS_SUCCESS,
    GET_PROJECT_TASKS_FAIL,
    GET_PROJECT_TASKS_SUCCESS,
    GET_PROJECTS_FAIL,
    GET_PROJECTS_SUCCESS, GETTING_TASKS_END, GETTING_TASKS_START, REMOVE_TASK_FROM_UI_SUCCESS,
    SET_CURRENT_PROJECT_FAIL,
    SET_CURRENT_PROJECT_SUCCESS,
    START_SETTING_CURRENT_PROJECT
} from "./types.actions";

export const getProjects = () => async dispatch => {
    try{
        const projects = await axios.get('/server/projects');
        dispatch({
            type: GET_PROJECTS_SUCCESS,
            projects: projects.data
        });
    }catch (e) {
        dispatch({
            type: GET_PROJECTS_FAIL,
            error: e.response.data.error
        })
    }
}

export const createProject = (projectData, navigate) => async dispatch => {
    try {
        const project = await axios.post('/server/create-project', projectData);
        dispatch({
            type: CREATE_PROJECT_SUCCESS,
            project: project.data.projectData
        });

        await dispatch(setCurrentProject(project.data.projectData.id));
        navigate('/dashboard/projects/' + project.data.projectData.id);
    }catch (e) {
        dispatch({
            typ: CREATE_PROJECT_FAIL,
            error: e.response.data.error
        })
    }
}

const startSettingCurrentProject = () => {
    return {
        type: START_SETTING_CURRENT_PROJECT
    }
}

const endSettingCurrentProject = () => {
    return {
        type: END_SETTING_CURRENT_PROJECT
    }
}

export const setCurrentProject = (project_id) => async dispatch => {
    try{
        // dispatch(startSettingCurrentProject());
        dispatch({
            type: SET_CURRENT_PROJECT_SUCCESS,
            id: project_id
        });
        // const projectTasks = await axios.get('/server/projects/' + project_id);
        // dispatch({
        //     type: SET_CURRENT_PROJECT_SUCCESS,
        //     todos: projectTasks.data
        // });
        await dispatch(getProjectTasks(project_id));
        // dispatch(endSettingCurrentProject())
    }catch (e) {
        dispatch({
            type: SET_CURRENT_PROJECT_FAIL,
            error: e.response.data.error
        });
    }
}

export const getProjectTasks = project_id => async dispatch => {
    try{
        dispatch(gettingTasksStart());
        const tasks = await axios.get('/server/projects/' + project_id);
        dispatch({
            type: GET_PROJECT_TASKS_SUCCESS,
            tasks: tasks.data
        });
        dispatch(gettingTasksEnd());
    }catch (e) {
        dispatch({
            type: GET_PROJECT_TASKS_FAIL,
            error: e.response.data.error
        })
    }
}

export const getAllTasks = () => async dispatch => {
    try{
        dispatch(gettingTasksStart());
        const tasks = await axios.get('/server/all-tasks');

        dispatch({
            type: GET_ALL_TASKS_SUCCESS,
            tasks: tasks.data
        });
        dispatch(gettingTasksEnd())
    }catch (e) {
        dispatch({
            type: GET_ALL_TASKS_FAIL,
            error: e.response.data.error
        })
    }
}

export const createNewTask = taskData => async dispatch => {
    try{
        dispatch(creatingTaskStart());
        const newTask = await axios.post('/server/create-task', taskData);
        dispatch({
            type: CREATE_NEW_TASK_SUCCESS,
            newTask: newTask.data.todoData
        });
        dispatch(creatingTaskEnd());
    }catch (e) {
        dispatch({
            type: CREATE_NEW_TASK_FAIL,
            error: e.response.data.error
        })
    }
}

export const deleteTask = taskId => async dispatch => {
    try{
        const task_id = await axios.delete('/server/delete-task/' + taskId);

        dispatch({
            type: DELETE_TASK_SUCCESS,
            taskId
        });
    }catch (e) {
        dispatch({
            type: DELETE_TASK_FAIL,
            error: e.response.data.error
        })
    }
}

export const deleteProject = (project_id, navigate, isProject) => async dispatch => {
    try {
        const projectId = await axios.delete('/server/delete-project/' + project_id);
        dispatch({
            type: DELETE_PROJECT_SUCCESS,
            projectId: projectId.data
        });
        if(isProject) return;
        navigate('/dashboard/today');
    }catch (e) {
        dispatch({
            type: DELETE_PROJECT_FAIL,
            error: e.response.data.error
        })
    }
}

export const editTask = taskData => async dispatch => {
    try {
        const data = await axios.put('/server/edit-task', taskData);
        dispatch({
            type: EDIT_TASK_SUCCESS,
            taskData: data.data
        });
    }catch (e) {
        dispatch({
            type: EDIT_TASK_FAIL,
            error: e.response.data.error
        })
    }
}

export const editProject = projectData => async dispatch => {
    try {
        const data = await axios.put('/server/edit-project', projectData);
        dispatch({
            type: EDIT_PROJECT_SUCCESS,
            projectD: data.data
        });
    }catch (e) {
        dispatch({
            type: EDIT_PROJECT_FAIL,
        })
    }
}

export const changeCategory = (task, category) => async dispatch => {
    try{
        const body = {
            task: task,
            newCategory: category
        }
        const newTask = await axios.put('/server/change-category', body);

        // dispatch({
        //     type: CHANGE_TASK_CATEGORY_SUCCESS,
        //     newTask: newTask.data
        // })
    }catch (e) {
        console.log(e);
        dispatch({
            type: CHANGE_TASK_CATEGORY__FAIL
        })
    }
}

export const removeTaskFromUI = (task) => {
    return {
        type: REMOVE_TASK_FROM_UI_SUCCESS,
        task: task
    }
}

export const addTaskToUI = (task, newCategory) => {
    return {
        type: ADD_TASK_TO_UI_SUCCESS,
        task,
        newCategory
    }
}

export const gettingTasksStart = () => {
    return {
        type: GETTING_TASKS_START
    }
}

export const gettingTasksEnd = () => {
    return {
        type: GETTING_TASKS_END
    }
}

export const creatingTaskStart = () => {
    return {
        type: CREATING_TASK_START
    }
}

export const creatingTaskEnd= () => {
    return {
        type: CREATING_TASK_END
    }
}