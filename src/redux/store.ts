import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ToDoListActionType, todoListReducer} from "../reducers/todoList-reducer";
import {TaskActionType, tasksReducer} from "../reducers/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'

const rootReducer = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для всего app
type AppActionsType = ToDoListActionType | TaskActionType

// типизация state
export type RootState = ReturnType<typeof store.getState>

// типизация dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

//типизация санки если она возвращает другую санку
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
