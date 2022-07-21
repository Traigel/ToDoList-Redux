import {v1} from "uuid";
import {TasksTodoListType, ToDoListType} from "../App";
import {
    tasksReducer
} from "./tasks-reducer";
import {addTodoListAC, todoListReducer} from "./todoList-reducer";

const toDoListID_1 = v1();
const toDoListID_2 = v1();

let todoList: ToDoListType[];
beforeEach(() => {
    todoList = [
        {id: toDoListID_1, title: 'What to learn', filter: 'all'},
        {id: toDoListID_2, title: 'Name To Do List', filter: 'all'},
    ]
})

let tasks: TasksTodoListType;
beforeEach(() => {
    tasks = {
        [toDoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "TypeScript", isDone: false},
        ],
        [toDoListID_2]: [
            {id: v1(), title: "Hello", isDone: true},
            {id: v1(), title: "Yo! Bro", isDone: true},
        ],
    }
})

test('new todo list and task', () => {
    const action = addTodoListAC('New todoList')
    const todoListReducer1 = todoListReducer(todoList, action)
    const tasksReducer1 = tasksReducer(tasks, action)

    const keys = Object.keys(tasksReducer1)
    const newKey = keys.find(el => el !== toDoListID_1 && el !== toDoListID_2)
    if (!newKey) throw Error('new key should be added')

    expect(keys.length).toBe(3)
    expect(newKey).toBe(action.payload.toDoListID)
    expect(todoListReducer1[0].id).toBe(action.payload.toDoListID)
    expect(tasksReducer1[newKey]).toStrictEqual([])
})
