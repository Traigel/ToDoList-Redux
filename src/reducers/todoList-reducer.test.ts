import {v1} from "uuid";
import {
    addTodoListAC,
    changesFilterAC,
    deleteTodoListAC,
    todoListNewTitleAC,
    todoListReducer
} from "./todoList-reducer";
import {ToDoListType} from "../App";

const toDoListID_1 = v1();
const toDoListID_2 = v1();

let todoList: ToDoListType[];
beforeEach(() => {
    todoList = [
        {id: toDoListID_1, title: 'What to learn', filter: 'all'},
        {id: toDoListID_2, title: 'Name To Do List', filter: 'all'},
    ]
})

test('filter changes', () => {
    const todoListReducer1 = todoListReducer(todoList, changesFilterAC(toDoListID_1, "active"))
    const todoListReducer2 = todoListReducer(todoList, changesFilterAC(toDoListID_2, "completed"))
    expect(todoListReducer1[0].filter).toBe("active")
    expect(todoListReducer2[1].filter).toBe("completed")
})

test('add new toDuList', () => {
    const todoListReducer1 = todoListReducer(todoList, addTodoListAC('New ToDoList'))
    expect(todoListReducer1[0].title).toBe('New ToDoList')
})

test('change toDoList new title', () => {
    const todoListReducer1 = todoListReducer(todoList, todoListNewTitleAC(toDoListID_1, "New Name ToDoList"))
    expect(todoListReducer1[0].title).toBe('New Name ToDoList')
})

test('delete toDoList', () => {
    const todoListReducer1 = todoListReducer(todoList, deleteTodoListAC(toDoListID_1))
    expect(todoListReducer1[0].id).not.toBe(toDoListID_1)
    expect(todoListReducer1.length).toBe(1)
})