import {v1} from "uuid";
import {
    addTitleTaskAC,
    deleteTitleTaskAC,
    newTitleTaskAC,
    tasksReducer, TasksTodoListType
} from "./tasks-reducer";
import {deleteTodoListAC} from "./todoList-reducer";
import {TaskPriorities, TaskStatuses} from "../api/api";

const toDoListID_1 = v1();
const toDoListID_2 = v1();
const taskID_1 = v1()

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

test('add title task', () => {
    const tasksReducer1 = tasksReducer(tasks, addTitleTaskAC(toDoListID_1, "New task"))
    expect(tasksReducer1[toDoListID_1][0].title).toBe("New task")
})
test('delete title task', () => {
    const tasksReducer1 = tasksReducer(tasks, deleteTitleTaskAC(toDoListID_1, taskID_1))
    expect(tasksReducer1[toDoListID_1][0].id).not.toBe(taskID_1)
    expect(tasksReducer1[toDoListID_1].length).toBe(3)
})
// test('isDone title task', () => {
//     const tasksReducer1 = tasksReducer(tasks, newIsDoneTaskAC(toDoListID_1, taskID_1, false))
//     expect(tasksReducer1[toDoListID_1][0].isDone).toBe(false)
// })
test('new title task', () => {
    const tasksReducer1 = tasksReducer(tasks, newTitleTaskAC(toDoListID_1, taskID_1, 'New Title Task'))
    expect(tasksReducer1[toDoListID_1][0].title).toBe('New Title Task')
})
test('delete todo list task', () => {
    const tasksReducer1 = tasksReducer(tasks, deleteTodoListAC(toDoListID_1))
    const keys = Object.keys(tasksReducer1)
    expect(tasksReducer1[toDoListID_1]).toBeUndefined()
    expect(keys.length).toBe(1)
    expect(keys[0]).toBe(toDoListID_2)
})