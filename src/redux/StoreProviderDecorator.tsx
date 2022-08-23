import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {todoListReducer} from "../reducers/todoList-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import {AppRootStateType} from "./store";
import {TaskPriorities, TaskStatuses} from "../api/api";


const rootReducer = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todoList: [
        {
            id: '1',
            title: 'HTML/CSS',
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: '2',
            title: 'JS/TS',
            filter: 'all',
            addedDate: '',
            order: 0
        },
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: '0',
                todoListId: '2',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '1',
                todoListId: '2',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2',
                todoListId: '2',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                todoListId: '2',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
        ],
        ['todolistId2']: [
            {
                id: '0',
                todoListId: '3',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '1',
                todoListId: '3',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
        ],
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)


export const StoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}