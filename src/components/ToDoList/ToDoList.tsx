import React from "react"
import styles from './ToDoList.module.css';
import {BodyList} from "./BoduList/BoduList";
import {SuperButton} from "../SuperButton/SuperButton";
import {NewTitle} from "./NewTitle/NewTitle";
import {FilterType, TasksType} from "../../App";
import {TaskTitle} from "./TaskTitle/TaskTitle";

type TodoListType = {
    toDoListID: string
    title: string
    filter: FilterType
    tasks: Array<TasksType>
    filterAddCallBack: (toDoListID: string, filterItem: FilterType) => void
    newTitleElCallBack: (toDoListID: string, newTitle: string) => void
    deleteTitleCalBack: (toDoListID: string, id: string) => void
    isDoneTitleCallBack: (toDoListID: string, id: string, newIsDone: boolean) => void
    deleteTodoListCallBack: (toDoListID: string) => void
    todoListNewTitleCallBack: (toDoListID: string, newTitle: string) => void
    taskNewTitleCallBack: (toDoListID: string, taskID: string, newTitle: string) => void
}

export const ToDoList = (props: TodoListType) => {

    const filterHandler = (filterItem: FilterType) => {
        if (filterItem === props.filter) return
        else props.filterAddCallBack(props.toDoListID, filterItem)
    }

    const newTitleHandler = (newTitle: string) => props.newTitleElCallBack(props.toDoListID, newTitle)

    const deleteTitleHandler = (id: string) => props.deleteTitleCalBack(props.toDoListID, id)

    const isDoneTitleHandler = (id: string, newIsDone: boolean) => props.isDoneTitleCallBack(props.toDoListID, id, newIsDone)

    const deleteTodoListHandler = () => props.deleteTodoListCallBack(props.toDoListID)

    const todoListNewTitleHandler = (newTitle: string) => props.todoListNewTitleCallBack(props.toDoListID, newTitle)

    const taskNewTitleHandler = (taskID: string, newTitle: string) => props.taskNewTitleCallBack(props.toDoListID, taskID, newTitle)

    return <div className={styles.item}>
        <h3>
            <TaskTitle title={props.title} titleValueCallBack={todoListNewTitleHandler}/>
            <SuperButton buttonName={'X'} callBack={deleteTodoListHandler}/>
        </h3>
        <div className={styles.newTitle}>
            <NewTitle newTitleCallBack={newTitleHandler}/>
        </div>
        <BodyList
            state={props.tasks}
            deleteCallBack={deleteTitleHandler}
            isDoneCallBack={isDoneTitleHandler}
            taskNewTitleCallBack={taskNewTitleHandler}
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