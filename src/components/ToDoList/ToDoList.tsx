import React from "react"
import styles from './ToDoList.module.css';
import {BodyList} from "./BoduList/BoduList";
import {SuperButton} from "../SuperButton/SuperButton";
import {NewTitle} from "./NewTitle/NewTitle";
import { TasksType } from "../../App";

type TodoListType = {
    id: string
    title: string
    tasks: Array<TasksType>
}

export const ToDoList = (props: TodoListType) => {

    const newTitleHandler = (newTitle: string) => {
        // let newTitleEl = {id: v1(), title: newTitle, isDone: false}
        // setToDoState([newTitleEl, ...toDoState])
    }

    const deleteTitleHandler = (id: string) => {}
        // setToDoState(toDoState.filter((el: ToDoStateType) => el.id !== id))

    const isDoneTitleHandler = (id: string, newIsDone: boolean) => {
        // setToDoState(toDoState.map(el => el.id === id ? {...el, isDone: newIsDone} : el))
    }


    // const filterTitleHandler = (filterItem: FilterType) => setFilter(filterItem)

    // const filterAffairs = (filter: FilterType, toDoState: Array<ToDoStateType>) => {
        // if (filter === 'active') return toDoState.filter((el: ToDoStateType) => !el.isDone)
        // else if (filter === 'completed') return toDoState.filter((el: ToDoStateType) => el.isDone)
        // else return toDoState
    // }

    // const filterState = filterAffairs(filter, toDoState)

    return <div className={styles.item}>
        <h3>{props.title}</h3>
        <div className={styles.newTitle}>
            <NewTitle newTitleCallBack={newTitleHandler}/>
        </div>
        <BodyList
            state={props.tasks}
            deleteCallBack={deleteTitleHandler}
            isDoneCallBack={isDoneTitleHandler}
        />
        <div className={styles.buttonFilter}>
            <div
                // className={`${filter === 'all' ? styles.activeFilter : ''}`}
            >
                <SuperButton buttonName={'All'} callBack={() => {}}/>
            </div>
            <div>
                <SuperButton buttonName={'Active'} callBack={() =>{} }/>
            </div>
            <div>
                <SuperButton buttonName={'Completed'} callBack={() =>{} }/>
            </div>
        </div>
    </div>
}