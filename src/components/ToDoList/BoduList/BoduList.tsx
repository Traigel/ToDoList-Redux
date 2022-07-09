import React from 'react';
import styles from './BoduList.module.css'
import {TasksType} from "../../../App";
import {TaskTitle} from "../TaskTitle/TaskTitle";
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Checkbox} from "@mui/material";

type BodyListType = {
    state: Array<TasksType>
    deleteCallBack: (id: string) => void
    isDoneCallBack: (id: string, newIsDone: boolean) => void
    taskNewTitleCallBack: (taskID: string, newTitle: string) => void
}

export const BodyList = (props: BodyListType) => {

    const buttonOnClickHandler = (id: string) => props.deleteCallBack(id)

    const inputOnClickHandler = (id: string, newIsDone: boolean) => props.isDoneCallBack(id, newIsDone)

    return (
        <div>
            {props.state.length > 0 ?
                props.state.map(u => {
                        const taskNewTitleHandler = (newTitle: string) => props.taskNewTitleCallBack(u.id, newTitle)
                        return (
                            <div key={u.id} className={styles.items}>
                                <Checkbox
                                    checked={u.isDone}
                                    onChange={(newIsDone) =>
                                        inputOnClickHandler(u.id, newIsDone.currentTarget.checked)}
                                />
                                <TaskTitle
                                    title={u.title}
                                    titleValueCallBack={taskNewTitleHandler}
                                    className={u.isDone ? styles.isDone : ''}
                                />
                                <IconButton aria-label="delete">
                                    <Delete onClick={() => buttonOnClickHandler(u.id)}/>
                                </IconButton>
                            </div>
                        )
                    }
                )
                :
                'Your tasks list is empty'
            }
        </div>
    )
}