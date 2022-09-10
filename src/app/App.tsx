import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from "../features/todoList/ToDoList";
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import {createToDoListTC, getTodoListTC} from "../reducers/todoList-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch, useAppSelector} from "../redux/store";
import {AppBarComponent} from "../features/AppBar/AppBar";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";

function App() {
    const todoLists = useAppSelector(state => state.todoList)
    const dispatch = useDispatch<AppDispatch>()

    const newTodoListHandler = useCallback((titleValue: string) => dispatch(createToDoListTC(titleValue)), [dispatch])

    useEffect(() => {
        dispatch(getTodoListTC)
    }, [])

    return (
        <div className="App">
            <AppBarComponent newTitleCallBack={newTodoListHandler}/>
            <CustomizedSnackbars/>
            <Container fixed>
                <Grid container spacing={3} style={{paddingTop: "15px"}}>
                    {todoLists.map(tl => {
                        return (
                            <Grid key={tl.id} item xs={4}>
                                <Paper elevation={6} style={{padding: "10px"}}>
                                    <ToDoList todoList={tl}/>
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