import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {ToDoList} from "./components/ToDoList/ToDoList";

type FilterType = 'all' | 'active' | 'completed'

type ToDoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TasksTodoListType = {
    [toDoListID: string] : Array<TasksType>
}

function App() {

    const toDoListID_1 = v1();
    const toDoListID_2 = v1();

    const [todoList, setTodoList] = useState<Array<ToDoListType>>([
        {id: toDoListID_1, title: 'Name To Do List', filter: 'all'},
        {id: toDoListID_2, title: 'Name 2 Hello', filter: 'all'},
    ])

    const [tasksTodoList, setTasksTodoList] = useState<TasksTodoListType>({
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
    })


    return (
        <div className="App">
            {todoList.map(tl=> {
                return (
                    <ToDoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksTodoList[tl.id]}
                    />
                )
            })}
        </div>
    );
}

export default App;
