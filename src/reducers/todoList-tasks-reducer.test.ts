import {v1} from "uuid";
import {
    tasksReducer, TasksTodoListType
} from "./tasks-reducer";
import {addTodoListAC, ToDoListDomainType, todoListReducer} from "./todoList-reducer";
import {TaskPriorities, TaskStatuses} from "../api/api";

const toDoListID_1 = v1();
const toDoListID_2 = v1();

let todoList: ToDoListDomainType[];
beforeEach(() => {
    todoList = [
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
    ]
})

let tasks: TasksTodoListType;
beforeEach(() => {
    tasks = {
        [toDoListID_1]: [
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
        [toDoListID_2]: [
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
})

// test('new todo list and task', () => {
//     const action = addTodoListAC('New todoList')
//     const todoListReducer1 = todoListReducer(todoList, action)
//     const tasksReducer1 = tasksReducer(tasks, action)
//
//     const keys = Object.keys(tasksReducer1)
//     const newKey = keys.find(el => el !== toDoListID_1 && el !== toDoListID_2)
//     if (!newKey) throw Error('new key should be added')
//
//     expect(keys.length).toBe(3)
//     expect(newKey).toBe(action.payload.toDoListID)
//     expect(todoListReducer1[0].id).toBe(action.payload.toDoListID)
//     expect(tasksReducer1[newKey]).toStrictEqual([])
// })
