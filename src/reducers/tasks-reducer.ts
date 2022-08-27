import {AddTodoListACType, DeleteTodoListACType, GetTodoListACType} from "./todoList-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TasksType} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../redux/store";

const initialState: TasksTodoListType = {}

export const tasksReducer = (state = initialState, action: TaskActionType): TasksTodoListType => {
    switch (action.type) {
        case "GET-TASKS": {
            return {
                ...state,
                [action.payload.toDoListID]: action.payload.tasks
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        }
        case 'DELETE-TASK': {
            return {
                ...state,
                [action.payload.toDoListID]: state[action.payload.toDoListID].filter(el => el.id !== action.payload.taskID)
            }
        }
        case 'UPDATE-TASK' : {
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId].map(task => task.id === action.payload.task.id ? {...action.payload.task} : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.toDoList.id]: []}
        }
        case 'DELETE-TODOLIST': {
            let {[action.payload.toDoListID]: remove, ...copyState} = {...state}
            return copyState
        }
        case "GET-TODOLIST": {
            const copyState = {...state}
            action.toDoLists.forEach(t => {copyState[t.id] = []})
            return copyState
        }
        default:
            return state
    }
}

//actions
export const getTasksAC = (toDoListID: string, tasks: TasksType[]) => {
    return {type: 'GET-TASKS', payload: {toDoListID, tasks}} as const
}
export const addTitleTaskAC = (task: TasksType) => {
    return {type: 'ADD-TASK', payload: {task}} as const
}
export const deleteTitleTaskAC = (toDoListID: string, taskID: string) => {
    return {type: 'DELETE-TASK', payload: {toDoListID, taskID}} as const
}
export const updateTaskAC = (task: TasksType) => {
    return {type: 'UPDATE-TASK', payload: {task}} as const
}

//thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<TaskActionType>) => {
    tasksAPI.getTask(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<TaskActionType>) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTitleTaskAC(res.data.data.item))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TaskActionType>) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(deleteTitleTaskAC(todolistId, taskId))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateModelType) =>
    (dispatch: Dispatch<TaskActionType>, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(task => task.id === taskId)
        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...model
            })
                .then(res => {
                    dispatch(updateTaskAC(res.data.data.item))
                })
        }
    }

// types
type UpdateModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type AddTitleTaskACType = ReturnType<typeof addTitleTaskAC>
type DeleteTitleTaskACType = ReturnType<typeof deleteTitleTaskAC>
type GetTasksACType = ReturnType<typeof getTasksAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export type TaskActionType =
    AddTitleTaskACType
    | DeleteTitleTaskACType
    | AddTodoListACType
    | DeleteTodoListACType
    | GetTodoListACType
    | GetTasksACType
    | UpdateTaskACType
export type TasksTodoListType = {
    [toDoListID: string]: TasksType[]
}