import React from 'react';
import './App.css';
import {TodoList} from "./components/ToDoList/TodoList";

function App() {
    return (
        <div className="App">
            <TodoList title={'Name To Do List'}/>
        </div>
    );
}

export default App;
