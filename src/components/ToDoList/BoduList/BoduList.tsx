import React from 'react';
import {ToDoStateType} from '../TodoList';
import styles from './BoduList.module.css'
import {Button} from "../Button/Button";

type BodyListType = {
    state: Array<ToDoStateType>,
    deleteCallBack: (id: string) => void
    isDoneCallBack: (id: string, newIsDone: boolean) => void
}

export const BodyList = (props: BodyListType) => {

    const buttonOnClickHandler = (id: string) => props.deleteCallBack(id)

    const inputOnClickHandler = (id: string, newIsDone: boolean) => props.isDoneCallBack(id,newIsDone)

    return (
        <div>
            <ul className={styles.ul}>
                {props.state.map(u => {
                        return (
                            <li key={u.id} className={`${u.isDone ? styles.isDone : ''} ${styles.items}`}>
                                <div>
                                    <input type="checkbox"
                                           onClick={(newIsDone) =>
                                               inputOnClickHandler(u.id, newIsDone.currentTarget.checked)}
                                           checked={u.isDone}/>
                                    <span>{u.title}</span>
                                </div>
                                <Button buttonName={'X'} callBack={()=>buttonOnClickHandler(u.id)}/>
                            </li>)
                    }
                )}
            </ul>
        </div>
    )
}