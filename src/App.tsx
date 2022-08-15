import React, {useCallback} from 'react';
import './App.css';
import {ToDoList} from "./components/ToDoList/ToDoList";
import ButtonAppBar from "./components/AppBar/AppBar";
import Container from '@mui/material/Container/Container';
import {Grid, Paper,} from "@mui/material";
import {addTodoListAC, ToDoListType} from "./reducers/todoList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";

function App() {
    console.log("App")
    const todoLists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todoList)
    const dispatch = useDispatch()

    const newTodoListHandler = useCallback((titleValue: string) => dispatch(addTodoListAC(titleValue)), [dispatch])

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