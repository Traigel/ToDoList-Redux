import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ToDoListActionType, todoListReducer} from "../features/TodolistsList/todoList-reducer";
import {TaskActionType, tasksReducer} from "../features/TodolistsList/TodoList/Tasks/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    todoList: todoListReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// типизация state
export type AppRootStateType = ReturnType<typeof store.getState>

// все типы экшенов для всего app
export type AppRootActionsType = ToDoListActionType | TaskActionType | AppActionsType | AuthActionsType

// типизация dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>

//типизация санки если она возвращает другую санку
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>
