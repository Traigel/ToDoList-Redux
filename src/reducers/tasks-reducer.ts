import {AddTodoListACType, DeleteTodoListACType, GetTodoListACType} from "./todoList-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TasksType} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../redux/store";

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

const initialState: TasksTodoListType = {}

export const tasksReducer = (state = initialState, action: TaskActionType): TasksTodoListType => {
    switch (action.type) {
        case "GET-TASKS": {
            return {
                ...state,
                [action.payload.toDoListID]: action.payload.tasks
            }
        }
        case 'ADD-TITLE-TASK': {
            const newTaskObj: TasksType = {
                id: action.payload.task.id,
                todoListId: action.payload.task.todoListId,
                title: action.payload.task.title,
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }

            return {
                ...state,
                [action.payload.task.todoListId]: [newTaskObj, ...state[action.payload.task.todoListId]]
            }
        }
        case 'DELETE-TITLE-TASK': {
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
            return {...state, [action.payload.toDoListType.id]: []}
        }
        case 'DELETE-TODOLIST': {
            let {[action.payload.toDoListID]: remove, ...copyState} = {...state}
            return copyState
        }
        case "GET-TODOLIST": {
            const copyState = {...state}
            action.toDoLists.forEach(t => {
                copyState[t.id] = []
            })
            return copyState
        }
        default:
            return state
    }
}
export const getTasksAC = (toDoListID: string, tasks: TasksType[]) => {
    return {type: 'GET-TASKS', payload: {toDoListID, tasks}} as const
}
export const addTitleTaskAC = (task: TasksType) => {
    return {type: 'ADD-TITLE-TASK', payload: {task}} as const
}
export const deleteTitleTaskAC = (toDoListID: string, taskID: string) => {
    return {type: 'DELETE-TITLE-TASK', payload: {toDoListID, taskID}} as const
}
export const updateTaskAC = (task: TasksType) => {
    return {type: 'UPDATE-TASK', payload: {task}} as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTask(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTitleTaskAC(res.data.data.item))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(deleteTitleTaskAC(todolistId, taskId))
        })
}

type UpdateModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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