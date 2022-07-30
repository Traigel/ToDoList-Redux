import {combineReducers, legacy_createStore} from "redux";
import {todoListReducer} from "../reducers/todoList-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)