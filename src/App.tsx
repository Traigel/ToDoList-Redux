import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number) => {
        tasks = tasks.filter(u => u.id !== taskId)
        setTasks(tasks)
        console.log(taskId)
    }

    const [filterValue, setFilterValue] = useState('All')

    const setFilter = (a:string) => setFilterValue(a)

    // let filteredTasks = tasks1
    //
    // const filterValueFu = (a: string) => {
    //     setfilterValue(a)
    //     console.log(a)
    // }
    //
    // if (filterValue ==='Active') {filteredTasks = tasks1.filter((u) => u.isDone === false)}
    //
    // if (filterValue === 'Completed') {filteredTasks = tasks1.filter((u) => u.isDone === true)}

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      setFilter={setFilter}
                      filterValue={filterValue}
                      />
        </div>
    );
}

export default App;
