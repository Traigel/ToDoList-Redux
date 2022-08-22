import {v1} from "uuid";
import {AddTodoListACType, DeleteTodoListACType} from "./todoList-reducer";
import {TaskPriorities, TaskStatuses, TasksType} from "../api/api";

type AddTitleTaskACType = ReturnType<typeof addTitleTaskAC>
type DeleteTitleTaskACType = ReturnType<typeof deleteTitleTaskAC>
type NewIsDoneTaskACType = ReturnType<typeof newIsDoneTaskAC>
type NewTitleTaskACType = ReturnType<typeof newTitleTaskAC>
type ActionType = AddTitleTaskACType | DeleteTitleTaskACType | NewIsDoneTaskACType | NewTitleTaskACType
    | AddTodoListACType | DeleteTodoListACType

export type TasksDomainType = TasksType

export type TasksTodoListType = {
    [toDoListID: string]: TasksType[]
}

const initialState: TasksTodoListType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksTodoListType => {
    switch (action.type) {
        case 'ADD-TITLE-TASK': {
            const newTitleObj: TasksType = {
                id: v1(),
                todoListId: action.payload.toDoListID,
                title: action.payload.newTitle,
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
                [action.payload.toDoListID]: [
                    newTitleObj,
                    ...state[action.payload.toDoListID]
                ]
            }
        }
        case 'DELETE-TITLE-TASK': {
            return {
                ...state,
                [action.payload.toDoListID]: state[action.payload.toDoListID].filter(el => el.id !== action.payload.taskID)
            }
        }
        case 'NEW-IS-DONE-TASK': {
            return {
                ...state,
                [action.payload.toDoListID]: state[action.payload.toDoListID].map(
                    el => el.id === action.payload.taskID ? {...el, isDone: action.payload.newIsDone} : el
                )
            }
        }
        case 'NEW-TITLE-TASK': {
            return {
                ...state,
                [action.payload.toDoListID]: state[action.payload.toDoListID].map(
                    el => el.id === action.payload.taskID ? {...el, title: action.payload.newTitle} : el
                )
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.toDoListID]: []}
        }
        case 'DELETE-TODOLIST': {
            let {[action.payload.toDoListID]: remove, ...copyState} = {...state}
            return copyState
        }
        default:
            return state
    }
}

export const addTitleTaskAC = (toDoListID: string, newTitle: string) => {
    return {type: 'ADD-TITLE-TASK', payload: {toDoListID, newTitle}} as const
}
export const deleteTitleTaskAC = (toDoListID: string, taskID: string) => {
    return {type: 'DELETE-TITLE-TASK', payload: {toDoListID, taskID}} as const
}
export const newIsDoneTaskAC = (toDoListID: string, taskID: string, newIsDone: boolean) => {
    return {type: 'NEW-IS-DONE-TASK', payload: {toDoListID, taskID, newIsDone}} as const
}
export const newTitleTaskAC = (toDoListID: string, taskID: string, newTitle: string) => {
    return {type: 'NEW-TITLE-TASK', payload: {toDoListID, taskID, newTitle}} as const
}