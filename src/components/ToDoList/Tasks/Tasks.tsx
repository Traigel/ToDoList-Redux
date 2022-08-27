import React, {ChangeEvent, memo} from 'react';
import styles from './Tasks.module.css'
import {TaskTitle} from "../TaskTitle/TaskTitle";
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import {deleteTaskTC, updateTaskTC} from '../../../reducers/tasks-reducer';
import {useDispatch} from "react-redux";
import {TaskStatuses, TasksType} from "../../../api/api";
import {AppDispatch} from "../../../redux/store";

type BodyListType = {
    tasks: TasksType
    todoListID: string
}

export const Tasks = memo((props: BodyListType) => {
    console.log('Tasks')

    const dispatch = useDispatch<AppDispatch>()

    const deleteTitleHandler = () => {
        dispatch(deleteTaskTC(props.todoListID, props.tasks.id))
    }

    const isDoneTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(props.todoListID, props.tasks.id, {status}))
    }

    const taskNewTitleHandler = (title: string) => {
        dispatch(updateTaskTC(props.todoListID, props.tasks.id, {title}))
    }

    return (
        <div>
            <div className={styles.items}>
                <Checkbox
                    checked={props.tasks.status === TaskStatuses.Completed}
                    onChange={isDoneTitleHandler}
                />
                <TaskTitle
                    title={props.tasks.title}
                    titleValueCallBack={taskNewTitleHandler}
                    className={props.tasks.status === TaskStatuses.Completed ? styles.isDone : ''}
                />
                <IconButton aria-label="delete">
                    <Delete onClick={deleteTitleHandler}/>
                </IconButton>
            </div>
        </div>
    )
})