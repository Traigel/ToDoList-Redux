import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {ToDoList} from "./components/ToDoList/ToDoList";

export type FilterType = 'all' | 'active' | 'completed'

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
        {id: toDoListID_1, title: 'What to learn', filter: 'all'},
        {id: toDoListID_2, title: 'Name To Do List', filter: 'all'},
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

    const filterAddHandler = (filterItem: FilterType, toDoListID: string) =>
        setTodoList(todoList.map(el=> el.id === toDoListID ? {...el, filter: filterItem} : el))


    return (
        <div className="App">
            {todoList.map(tl=> {
                let filterTasks;
                if (tl.filter === 'active') filterTasks = tasksTodoList[tl.id].filter(el=> !el.isDone)
                else if (tl.filter === 'completed') filterTasks = tasksTodoList[tl.id].filter(el=> el.isDone)
                else filterTasks = tasksTodoList[tl.id]
                return (
                    <ToDoList
                        key={tl.id}
                        toDoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filterTasks}
                        filterAddCallBack={filterAddHandler}
                    />
                )
            })}
        </div>
    );
}

export default App;
