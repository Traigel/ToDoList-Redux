import React from "react"
import style from './ToDoList.module.css';
import {BodyList} from "./BoduList/BoduList";
import {SuperButton} from "../SuperButton/SuperButton";
import {NewTitle} from "./NewTitle/NewTitle";
import {FilterType, TasksType} from "../../App";
import {TaskTitle} from "./TaskTitle/TaskTitle";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton/IconButton";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";

type TodoListType = {
    toDoListID: string
    title: string
    filter: FilterType
    tasks: Array<TasksType>
    filterAddCallBack: (toDoListID: string, filterItem: FilterType) => void
    newTitleElCallBack: (toDoListID: string, newTitle: string) => void
    deleteTitleCalBack: (toDoListID: string, id: string) => void
    isDoneTitleCallBack: (toDoListID: string, id: string, newIsDone: boolean) => void
    deleteTodoListCallBack: (toDoListID: string) => void
    todoListNewTitleCallBack: (toDoListID: string, newTitle: string) => void
    taskNewTitleCallBack: (toDoListID: string, taskID: string, newTitle: string) => void
}

export const ToDoList = (props: TodoListType) => {

    const filterHandler = (filterItem: FilterType) => {
        if (filterItem === props.filter) return
        else props.filterAddCallBack(props.toDoListID, filterItem)
    }

    const newTitleHandler = (newTitle: string) => props.newTitleElCallBack(props.toDoListID, newTitle)

    const deleteTitleHandler = (id: string) => props.deleteTitleCalBack(props.toDoListID, id)

    const isDoneTitleHandler = (id: string, newIsDone: boolean) => props.isDoneTitleCallBack(props.toDoListID, id, newIsDone)

    const deleteTodoListHandler = () => props.deleteTodoListCallBack(props.toDoListID)

    const todoListNewTitleHandler = (newTitle: string) => props.todoListNewTitleCallBack(props.toDoListID, newTitle)

    const taskNewTitleHandler = (taskID: string, newTitle: string) => props.taskNewTitleCallBack(props.toDoListID, taskID, newTitle)

    return <div className={style.item}>
        <h3>
            <TaskTitle title={props.title} titleValueCallBack={todoListNewTitleHandler}/>
            <IconButton aria-label="delete">
                <Delete onClick={deleteTodoListHandler}/>
            </IconButton>
        </h3>
        <div className={style.newTitle}>
            <NewTitle
                newTitleCallBack={newTitleHandler}
                classNameButton={style.button}
            />
        </div>
        <BodyList
            state={props.tasks}
            deleteCallBack={deleteTitleHandler}
            isDoneCallBack={isDoneTitleHandler}
            taskNewTitleCallBack={taskNewTitleHandler}
        />
        <Container fixed>
            <Grid container spacing={3}>
                <Grid item>
                    <SuperButton
                        buttonName={'All'}
                        variant={props.filter === 'all' ? 'outlined' : 'contained'}
                        size={"small"}
                        callBack={() => filterHandler('all')}
                    />
                </Grid>
                <Grid item>
                    <SuperButton
                        buttonName={'Active'}
                        variant={props.filter === 'active' ? 'outlined' : 'contained'}
                        size={"small"}
                        callBack={() => filterHandler('active')}
                    />
                </Grid>
                <Grid item>
                    <SuperButton
                        buttonName={'Completed'}
                        variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        size={"small"}
                        callBack={() => filterHandler('completed')}
                    />
                </Grid>
            </Grid>
        </Container>
    </div>
}