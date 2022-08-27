import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListReducer, ToDoListActionType} from "../reducers/todoList-reducer";
import {tasksReducer, TaskActionType} from "../reducers/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'

const rootReducer = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

type AppActionsType = ToDoListActionType | TaskActionType
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>


export type AppRootStateType = ReturnType<typeof rootReducer>