import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {todoListReducer} from "../reducers/todoList-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import {AppRootStateType} from "./store";


const rootReducer = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todoList: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'React Book', isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)


export const StoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}