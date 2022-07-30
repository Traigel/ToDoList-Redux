import React from "react"
import style from './ToDoList.module.css';
import {BodyList} from "./BoduList/BoduList";
import {NewTitle} from "./NewTitle/NewTitle";
import {TaskTitle} from "./TaskTitle/TaskTitle";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton/IconButton";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import {Button} from "@mui/material";
import {
    changesFilterAC,
    deleteTodoListAC,
    FilterType,
    todoListNewTitleAC,
    ToDoListType
} from "../../reducers/todoList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {
    addTitleTaskAC,
    deleteTitleTaskAC,
    newIsDoneTaskAC,
    newTitleTaskAC,
    TasksType
} from "../../reducers/tasks-reducer";

type TodoListType = {
    todoList: ToDoListType
}

export function ToDoList(props: TodoListType) {

    const {id, title, filter} = props.todoList

    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])
    const dispatch = useDispatch()

    const filterHandler = (filterItem: FilterType) => {
        if (filterItem === filter) return
        else dispatch(changesFilterAC(id, filterItem))
    }

    const newTitleHandler = (newTitle: string) => dispatch(addTitleTaskAC(id, newTitle))

    const deleteTitleHandler = (taskID: string) => dispatch(deleteTitleTaskAC(id, taskID))

    const isDoneTitleHandler = (taskID: string, newIsDone: boolean) => dispatch(newIsDoneTaskAC(id, taskID, newIsDone))

    const deleteTodoListHandler = () => dispatch(deleteTodoListAC(id))

    const todoListNewTitleHandler = (newTitle: string) => dispatch(todoListNewTitleAC(id, newTitle))

    const taskNewTitleHandler = (taskID: string, newTitle: string) => dispatch(newTitleTaskAC(id, taskID, newTitle))

    if (filter === 'active') tasks = tasks.filter(el => !el.isDone)
    if (filter === 'completed') tasks = tasks.filter(el => el.isDone)

    return <div className={style.item}>
        <h3>
            <TaskTitle title={title} titleValueCallBack={todoListNewTitleHandler}/>
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
            state={tasks}
            deleteCallBack={deleteTitleHandler}
            isDoneCallBack={isDoneTitleHandler}
            taskNewTitleCallBack={taskNewTitleHandler}
        />
        <Container fixed>
            <Grid container spacing={3}>
                <Grid item>
                    <Button
                        variant={filter === 'all' ? 'outlined' : 'contained'}
                        onClick={() => filterHandler('all')}
                        size={"small"}
                    >All</Button>
                </Grid>
                <Grid item>
                    <Button
                        variant={filter === 'active' ? 'outlined' : 'contained'}
                        onClick={() => filterHandler('active')}
                        size={"small"}
                    >Active</Button>
                </Grid>
                <Grid item>
                    <Button
                        variant={filter === 'completed' ? 'outlined' : 'contained'}
                        onClick={() => filterHandler('completed')}
                        size={"small"}
                    >Completed</Button>
                </Grid>
            </Grid>
        </Container>
    </div>
}