import React from "react"
import styles from './ToDoList.module.css';
import {BodyList} from "./BoduList/BoduList";
import {SuperButton} from "../SuperButton/SuperButton";
import {NewTitle} from "./NewTitle/NewTitle";
import {FilterType, TasksType} from "../../App";

type TodoListType = {
    toDoListID: string
    title: string
    filter: FilterType
    tasks: Array<TasksType>
    filterAddCallBack: (filterItem: FilterType, toDoListID: string)=> void
}

export const ToDoList = (props: TodoListType) => {

    const newTitleHandler = (newTitle: string) => {
        // let newTitleEl = {id: v1(), title: newTitle, isDone: false}
        // setToDoState([newTitleEl, ...toDoState])
    }

    const deleteTitleHandler = (id: string) => {
    }
    // setToDoState(toDoState.filter((el: ToDoStateType) => el.id !== id))

    const isDoneTitleHandler = (id: string, newIsDone: boolean) => {
        // setToDoState(toDoState.map(el => el.id === id ? {...el, isDone: newIsDone} : el))
    }

    const filterHandler = (filterItem: FilterType) => {
        if (filterItem === props.filter) return
        else props.filterAddCallBack(filterItem, props.toDoListID)
    }

    // const filterAffairs = (filter: FilterType, toDoState: Array<ToDoStateType>) => {
    // if (filter === 'active') return toDoState.filter((el: ToDoStateType) => !el.isDone)
    // else if (filter === 'completed') return toDoState.filter((el: ToDoStateType) => el.isDone)
    // else return toDoState
    // }


    return <div className={styles.item}>
        <h3>
            {props.title}
            <SuperButton buttonName={'X'} callBack={() => {}}/>
        </h3>
        <div className={styles.newTitle}>
            <NewTitle newTitleCallBack={newTitleHandler}/>
        </div>
        <BodyList
            state={props.tasks}
            deleteCallBack={deleteTitleHandler}
            isDoneCallBack={isDoneTitleHandler}
        />
        <div className={styles.buttonFilter}>
            <div className={`${props.filter === 'all' ? styles.activeFilter : ''}`}>
                <SuperButton buttonName={'All'} callBack={() => filterHandler('all')}/>
            </div>
            <div className={`${props.filter === 'active' ? styles.activeFilter : ''}`}>
                <SuperButton buttonName={'Active'} callBack={() => filterHandler('active')}/>
            </div>
            <div className={`${props.filter === 'completed' ? styles.activeFilter : ''}`}>
                <SuperButton buttonName={'Completed'} callBack={() => filterHandler('completed')}/>
            </div>
        </div>
    </div>
}