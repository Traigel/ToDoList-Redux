import {v1} from "uuid";
import {
    tasksReducer, TasksTodoListType
} from "./tasks-reducer";
import {addTodoListAC, ToDoListDomainType, todoListReducer} from "./todoList-reducer";
import {TaskPriorities, TaskStatuses, ToDoListType} from "../api/api";

const toDoListID_1 = v1();
const toDoListID_2 = v1();
const toDoListID_3 = v1();

let todoList: ToDoListDomainType[];
let newTodoList: ToDoListType
let tasks: TasksTodoListType;
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
            }
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
            }
        ],
    }
    newTodoList = {
        id: toDoListID_3,
        title: 'New ToDoList',
        order: 0,
        addedDate: ''
    }
})

test('new todo list and task', () => {
    const action = addTodoListAC(newTodoList)
    const todoListReducer1 = todoListReducer(todoList, action)
    const tasksReducer1 = tasksReducer(tasks, action)

    expect(todoListReducer1.length).toBe(3)
    expect(tasksReducer1[toDoListID_3]).toStrictEqual([])
})
