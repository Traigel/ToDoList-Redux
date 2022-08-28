import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from "./features/todoList/ToDoList";
import ButtonAppBar from "./components/AppBar/AppBar";
import Container from '@mui/material/Container/Container';
import {Grid, Paper,} from "@mui/material";
import {createToDoListTC, getTodoListTC, ToDoListDomainType} from "./reducers/todoList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./redux/store";

function App() {
    const todoLists = useSelector<AppRootStateType, ToDoListDomainType[]>(state => state.todoList)
    const dispatch = useDispatch<AppDispatch>()

    const newTodoListHandler = useCallback((titleValue: string) => dispatch(createToDoListTC(titleValue)), [dispatch])

    useEffect(() => {
        dispatch(getTodoListTC)
    }, [])

    return (
        <div className="App">
            <ButtonAppBar newTitleCallBack={newTodoListHandler}/>
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