import {v1} from "uuid";
import {TasksTodoListType} from "../App";
import {
    addTitleTaskAC,
    deleteTitleTaskAC, deleteTodoListTasksAC,
    newIsDoneTaskAC,
    newTitleTaskAC,
    newTodoListTasksAC,
    tasksReducer
} from "./tasks-reducer";

const toDoListID_1 = v1();
const toDoListID_2 = v1();
const toDoListID_3 = v1();
const taskID_1 = v1()

let tasks: TasksTodoListType;
beforeEach(() => {
    tasks = {
        [toDoListID_1]: [
            {id: taskID_1, title: "HTML&CSS", isDone: true},
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

test('add title task', () => {
    const tasksReducer1 = tasksReducer(tasks, addTitleTaskAC(toDoListID_1, "New task"))
    expect(tasksReducer1[toDoListID_1][0].title).toBe("New task")
})
test('delete title task', () => {
    const tasksReducer1 = tasksReducer(tasks, deleteTitleTaskAC(toDoListID_1, taskID_1))
    expect(tasksReducer1[toDoListID_1][0].id).not.toBe(taskID_1)
    expect(tasksReducer1[toDoListID_1].length).toBe(3)
})
test('isDone title task', () => {
    const tasksReducer1 = tasksReducer(tasks, newIsDoneTaskAC(toDoListID_1, taskID_1, false))
    expect(tasksReducer1[toDoListID_1][0].isDone).toBe(false)
})
test('new title task', () => {
    const tasksReducer1 = tasksReducer(tasks, newTitleTaskAC(toDoListID_1, taskID_1, 'New Title Task'))
    expect(tasksReducer1[toDoListID_1][0].title).toBe('New Title Task')
})
test('new todo list task', () => {
    const tasksReducer1 = tasksReducer(tasks, newTodoListTasksAC(toDoListID_3))
    expect(tasksReducer1[toDoListID_3]).toBe(tasksReducer1[toDoListID_3])
})
test('delete todo list task', () => {
    const tasksReducer1 = tasksReducer(tasks, deleteTodoListTasksAC(toDoListID_1))
    expect(tasksReducer1[toDoListID_1]).toBe(undefined)
})
