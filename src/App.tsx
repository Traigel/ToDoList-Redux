import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {ToDoList} from "./components/ToDoList/ToDoList";
import ButtonAppBar from "./components/AppBar/AppBar";
import Container from '@mui/material/Container/Container';
import {Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changesFilterAC,
    deleteTodoListAC,
    todoListNewTitleAC,
    todoListReducer
} from "./reducers/todoList-reducer";
import {
    addTitleTaskAC,
    deleteTitleTaskAC,
    newIsDoneTaskAC, newTitleTaskAC,
    tasksReducer
} from "./reducers/tasks-reducer";

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

export type TasksTodoListType = {
    [toDoListID: string]: TasksType[]
}

function App() {

    const toDoListID_1 = v1();
    const toDoListID_2 = v1();

    const [todoList, dispatchTodoList] = useReducer(todoListReducer, [
        {id: toDoListID_1, title: 'What to learn', filter: 'all'},
        {id: toDoListID_2, title: 'Name To Do List', filter: 'all'},
    ])

    const [tasksTodoList, dispatchTasks] = useReducer(tasksReducer, {
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

    const filterAddHandler = (toDoListID: string, filterItem: FilterType) => {
        dispatchTodoList(changesFilterAC(toDoListID, filterItem))
    }

    const addTitleTaskHandler = (toDoListID: string, newTitle: string) => {
        dispatchTasks(addTitleTaskAC(toDoListID, newTitle))
    }

    const deleteTitleHandler = (toDoListID: string, taskID: string) => {
        dispatchTasks(deleteTitleTaskAC(toDoListID, taskID))
    }

    const isDoneTitleHandler = (toDoListID: string, taskID: string, newIsDone: boolean) => {
        dispatchTasks(newIsDoneTaskAC(toDoListID, taskID, newIsDone))
    }

    const deleteTodoListHandler = (toDoListID: string) => {
        dispatchTodoList(deleteTodoListAC(toDoListID))
        dispatchTasks(deleteTodoListAC(toDoListID))
    }

    const newTodoListHandler = (titleValue: string) => {
        const action = addTodoListAC(titleValue)
        dispatchTodoList(action)
        dispatchTasks(action)
    }

    const todoListNewTitleHandler = (toDoListID: string, newTitle: string) => {
        dispatchTodoList(todoListNewTitleAC(toDoListID, newTitle))
    }

    const newTitleTaskHandler = (toDoListID: string, taskID: string, newTitle: string) => {
        dispatchTasks(newTitleTaskAC(toDoListID, taskID, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar newTitleCallBack={newTodoListHandler}/>
            <Container fixed>
                <Grid container spacing={3} style={{paddingTop: "15px"}}>
                    {todoList.map(tl => {
                        let filterTasks = tasksTodoList[tl.id]
                        if (tl.filter === 'active') filterTasks = tasksTodoList[tl.id].filter(el => !el.isDone)
                        if (tl.filter === 'completed') filterTasks = tasksTodoList[tl.id].filter(el => el.isDone)
                        return (
                            <Grid key={tl.id} item xs={4}>
                                <Paper elevation={6} style={{padding: "10px"}}>
                                    <ToDoList
                                        toDoListID={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={filterTasks}
                                        filterAddCallBack={filterAddHandler}
                                        newTitleElCallBack={addTitleTaskHandler}
                                        deleteTitleCalBack={deleteTitleHandler}
                                        isDoneTitleCallBack={isDoneTitleHandler}
                                        deleteTodoListCallBack={deleteTodoListHandler}
                                        todoListNewTitleCallBack={todoListNewTitleHandler}
                                        taskNewTitleCallBack={newTitleTaskHandler}
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