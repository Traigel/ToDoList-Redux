import React, {memo, ChangeEvent} from 'react';
import styles from './Tasks.module.css'
import {TaskTitle} from "../TaskTitle/TaskTitle";
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import {deleteTitleTaskAC, newIsDoneTaskAC, newTitleTaskAC, TasksType} from '../../../reducers/tasks-reducer';
import {useDispatch} from "react-redux";

type BodyListType = {
    tasks: TasksType
    todoListID: string
}

export const Tasks = memo((props: BodyListType) => {
    console.log('Tasks')

    const dispatch = useDispatch()

    const deleteTitleHandler = () => {
        dispatch(deleteTitleTaskAC(props.todoListID, props.tasks.id))
    }

    const isDoneTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(newIsDoneTaskAC(props.todoListID, props.tasks.id, newIsDoneValue))
    }

    const taskNewTitleHandler = (newTitle: string) => {
        dispatch(newTitleTaskAC(props.todoListID, props.tasks.id, newTitle))
    }

    return (
        <div>
            <div className={styles.items}>
                <Checkbox
                    checked={props.tasks.isDone}
                    onChange={isDoneTitleHandler}
                />
                <TaskTitle
                    title={props.tasks.title}
                    titleValueCallBack={taskNewTitleHandler}
                    className={props.tasks.isDone ? styles.isDone : ''}
                />
                <IconButton aria-label="delete">
                    <Delete onClick={deleteTitleHandler}/>
                </IconButton>
            </div>
        </div>
    )
})