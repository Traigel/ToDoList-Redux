import React from 'react';
import {ToDoStateType} from '../TodoList';
import styles from './BoduList.module.css'
import {Button} from "../Button/Button";

type BodyListType = {
    state: Array<ToDoStateType>,
    deleteCallBack: (id: string) => void
    isDoneCallBack: (id: string) => void
}

export const BodyList = (props: BodyListType) => {

    const buttonOnClickHandler = (id: string) => props.deleteCallBack(id)

    const inputOnClickHandler = (id: string) => props.isDoneCallBack(id)

    return (
        <div>
            <ul className={styles.ul}>
                {props.state.map(u => {
                        return (
                            <li key={u.id} className={styles.items}>
                                <div>
                                    <input type="checkbox"
                                           onClick={() => inputOnClickHandler(u.id)}
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