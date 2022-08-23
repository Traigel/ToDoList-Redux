import React, {memo, useCallback} from "react"
import style from './ToDoList.module.css';
import {Tasks} from "./Tasks/Tasks";
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
    ToDoListDomainType,
    todoListNewTitleAC,
} from "../../reducers/todoList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {addTitleTaskAC,} from "../../reducers/tasks-reducer";
import {TaskStatuses, TasksType} from "../../api/api";

type TodoListType = {
    todoList: ToDoListDomainType
}

export const ToDoList = memo((props: TodoListType) => {
    console.log('ToDoList')
    const {id, title, filter} = props.todoList

    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])
    const dispatch = useDispatch()

    const filterHandler = (filterItem: FilterType) => {
        if (filterItem === filter) return
        else dispatch(changesFilterAC(id, filterItem))
    }

    const newTitleHandler = useCallback((newTitle: string) => dispatch(addTitleTaskAC(id, newTitle)), [dispatch])

    const deleteTodoListHandler = () => dispatch(deleteTodoListAC(id))

    const todoListNewTitleHandler = (newTitle: string) => dispatch(todoListNewTitleAC(id, newTitle))

    if (filter === 'active') tasks = tasks.filter(el => el.status === TaskStatuses.New)
    if (filter === 'completed') tasks = tasks.filter(el => el.status === TaskStatuses.Completed)

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
        {tasks.length > 0 ?
            tasks.map(task => {
                return <Tasks
                    key={task.id}
                    tasks={task}
                    todoListID={id}
                />
            })
            :
            <h3>Your tasks list is empty</h3>
        }

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
})