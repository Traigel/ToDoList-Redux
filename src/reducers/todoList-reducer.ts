import {FilterType, ToDoListType} from "../App";
import {v1} from "uuid";

type AddTodoListACType = ReturnType<typeof addTodoListAC>
type FilterAddACType = ReturnType<typeof changesFilterAC>
type TodoListNewTitleAC = ReturnType<typeof todoListNewTitleAC>
type DeleteTodoListAC = ReturnType<typeof deleteTodoListAC>
type ActionType = AddTodoListACType | FilterAddACType | TodoListNewTitleAC | DeleteTodoListAC

export const todoListReducer = (state: Array<ToDoListType>, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [{id: v1(), title: action.payload.titleValue, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.toDoListID ? {...el, filter: action.payload.filterItem} : el)
        }
        case 'CHANGE-TODOLIST-NEW-TITLE': {
            return state.map(el => el.id === action.payload.toDoListID ? {...el, title: action.payload.newTitle} : el)
        }
        case 'DELETE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.toDoListID)
        }
        default: return state
    }
}

export const addTodoListAC = (titleValue: string) => {
    return {type: 'ADD-TODOLIST', payload: {titleValue}} as const
}

export const changesFilterAC = (toDoListID: string, filterItem: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {toDoListID, filterItem}} as const
}

export const todoListNewTitleAC = (toDoListID: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-NEW-TITLE', payload: {toDoListID, newTitle}} as const
}

export const deleteTodoListAC = (toDoListID: string) => {
    return {type: 'DELETE-TODOLIST', payload: {toDoListID}} as const
}

