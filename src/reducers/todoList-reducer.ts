import {Dispatch} from "redux";
import {toDoListAPI, ToDoListType} from "../api/api";

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
type FilterAddACType = ReturnType<typeof changesFilterAC>
type TodoListNewTitleACType = ReturnType<typeof todoListNewTitleAC>
export type DeleteTodoListACType = ReturnType<typeof deleteTodoListAC>
export type GetTodoListACType = ReturnType<typeof getTodoListAC>
export type ToDoListActionType =
    AddTodoListACType
    | FilterAddACType
    | TodoListNewTitleACType
    | DeleteTodoListACType
    | GetTodoListACType

export type FilterType = 'all' | 'active' | 'completed'

export type ToDoListDomainType = ToDoListType & {
    filter: FilterType
}

const initialState: ToDoListDomainType[] = []

export const todoListReducer = (state = initialState, action: ToDoListActionType): ToDoListDomainType[] => {
    switch (action.type) {
        case "GET-TODOLIST": {
            return action.toDoLists.map(el => ({...el, filter: 'all'}))
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.payload.toDoListType.id,
                title: action.payload.toDoListType.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.toDoListID ? {
                ...el,
                filter: action.payload.filterItem
            } : el)
        }
        case 'CHANGE-TODOLIST-NEW-TITLE': {
            return state.map(el => el.id === action.payload.toDoListID ? {...el, title: action.payload.newTitle} : el)
        }
        case 'DELETE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.toDoListID)
        }
        default:
            return state
    }
}

export const getTodoListAC = (toDoLists: ToDoListType[]) => {
    return {type: 'GET-TODOLIST', toDoLists} as const
}
export const addTodoListAC = (toDoListType: ToDoListType) => {
    return {type: 'ADD-TODOLIST', payload: {toDoListType}} as const
}
export const deleteTodoListAC = (toDoListID: string) => {
    return {type: 'DELETE-TODOLIST', payload: {toDoListID}} as const
}
export const todoListNewTitleAC = (toDoListID: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-NEW-TITLE', payload: {toDoListID, newTitle}} as const
}
export const changesFilterAC = (toDoListID: string, filterItem: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {toDoListID, filterItem}} as const
}

export const getTodoListTC = (dispatch: Dispatch) => {
    toDoListAPI.getToDoList()
        .then(res => {
            dispatch(getTodoListAC(res.data))
        })
}
export const createToDoListTC = (titleValue: string) => (dispatch: Dispatch) => {
    toDoListAPI.createToDoList(titleValue)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const deleteToDoListTC = (todolistId: string) => (dispatch: Dispatch) => {
    toDoListAPI.deleteToDoList(todolistId)
        .then(res => {
            dispatch(deleteTodoListAC(todolistId))
        })
}
export const updateToDoListTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    toDoListAPI.updateToDoLists(todolistId, title)
        .then(res => {
            dispatch(todoListNewTitleAC(todolistId, title))
        })
}