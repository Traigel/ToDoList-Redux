import React from 'react';
import styles from './BoduList.module.css'
import {SuperButton} from "../../SuperButton/SuperButton";
import {TasksType} from "../../../App";
import {TaskTitle} from "../TaskTitle/TaskTitle";

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
            <ul className={styles.ul}>
                {props.state.length > 0 ?
                    props.state.map(u => {
                        const taskNewTitleHandler = (newTitle: string) => props.taskNewTitleCallBack(u.id, newTitle)
                            return (
                                <li key={u.id} className={`${u.isDone ? styles.isDone : ''} ${styles.items}`}>
                                    <div>
                                        <input type="checkbox"
                                               onClick={(newIsDone) =>
                                                   inputOnClickHandler(u.id, newIsDone.currentTarget.checked)}
                                               checked={u.isDone}/>
                                        <TaskTitle title={u.title} titleValueCallBack={taskNewTitleHandler}/>
                                    </div>
                                    <SuperButton buttonName={'X'} callBack={() => buttonOnClickHandler(u.id)}/>
                                </li>)
                        }
                    )
                    :
                    'Your tasks list is empty'
                }
            </ul>
        </div>
    )
}