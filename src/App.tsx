import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {ToDoList} from "./components/ToDoList/ToDoList";
import ButtonAppBar from "./components/AppBar/AppBar";
import Container from '@mui/material/Container/Container';
import {Grid, Paper} from "@mui/material";

export type FilterType = 'all' | 'active' | 'completed'

export type ToDoListType = {
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
    [toDoListID: string]: Array<TasksType>
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

    const filterAddHandler = (toDoListID: string, filterItem: FilterType) =>
        setTodoList(todoList.map(el => el.id === toDoListID ? {...el, filter: filterItem} : el))

    const newTitleElHandler = (toDoListID: string, newTitle: string) => {
        const newTitleObj = {id: v1(), title: newTitle, isDone: false}
        setTasksTodoList({...tasksTodoList, [toDoListID]: [newTitleObj, ...tasksTodoList[toDoListID]]})
    }

    const deleteTitleHandler = (toDoListID: string, id: string) =>
        setTasksTodoList({...tasksTodoList, [toDoListID]: tasksTodoList[toDoListID].filter(el => el.id !== id)})

    const isDoneTitleHandler = (toDoListID: string, id: string, newIsDone: boolean) =>
        setTasksTodoList({
            ...tasksTodoList,
            [toDoListID]: tasksTodoList[toDoListID].map(el => el.id === id ? {...el, isDone: newIsDone} : el)
        })

    const deleteTodoListHandler = (toDoListID: string) => {
        setTodoList(todoList.filter(el => el.id !== toDoListID))
        delete tasksTodoList[toDoListID]
    }

    const newTodoListHandler = (titleValue: string) => {
        const newTodoList: ToDoListType = {id: v1(), title: titleValue, filter: 'all'}
        setTodoList([newTodoList, ...todoList])
        setTasksTodoList({...tasksTodoList, [newTodoList.id]: []})
    }

    const todoListNewTitleHandler = (toDoListID: string, newTitle: string) =>
        setTodoList(todoList.map(el => el.id === toDoListID ? {...el, title: newTitle} : el))

    const taskNewTitleHandler = (toDoListID: string, taskID: string, newTitle: string) =>
        setTasksTodoList({
            ...tasksTodoList,
            [toDoListID]: tasksTodoList[toDoListID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })

    return (
        <div className="App">
            <ButtonAppBar newTitleCallBack={newTodoListHandler}/>
            <Container fixed>
                <Grid container spacing={3}style={{paddingTop: "15px"}}>
                    {todoList.map(tl => {
                        let filterTasks;
                        if (tl.filter === 'active') filterTasks = tasksTodoList[tl.id].filter(el => !el.isDone)
                        else if (tl.filter === 'completed') filterTasks = tasksTodoList[tl.id].filter(el => el.isDone)
                        else filterTasks = tasksTodoList[tl.id]
                        return (
                            <Grid key={tl.id} item xs={4}>
                                <Paper elevation={6} style={{padding: "10px"}}>
                                    <ToDoList
                                        toDoListID={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={filterTasks}
                                        filterAddCallBack={filterAddHandler}
                                        newTitleElCallBack={newTitleElHandler}
                                        deleteTitleCalBack={deleteTitleHandler}
                                        isDoneTitleCallBack={isDoneTitleHandler}
                                        deleteTodoListCallBack={deleteTodoListHandler}
                                        todoListNewTitleCallBack={todoListNewTitleHandler}
                                        taskNewTitleCallBack={taskNewTitleHandler}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;