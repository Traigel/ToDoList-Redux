import React from 'react';
import {ToDoStateType} from '../TodoList';
import styles from './BoduList.module.css'

type BodyListType = {
    state: Array<ToDoStateType>,
    callBack: (id:number)=>void
}

export const BodyList = (props: BodyListType) => {

    const buttonOnClickHandler = (id:number) => props.callBack(id)

    return (
        <div>
            <ul className={styles.ul}>
                {props.state.map(u => {
                        return (
                            <li key={u.id} className={styles.items}>
                                <div>
                                    <input type="checkbox" checked={u.isDone}/>
                                    <span>{u.title}</span>
                                </div>
                                <div>
                                    <button onClick={()=>buttonOnClickHandler(u.id)}>x</button>
                                </div>
                            </li>)
                    }
                )}
            </ul>
        </div>
    )
}