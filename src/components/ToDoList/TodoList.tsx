import React, {useState} from "react"
import styles from './ToDoList.module.css';
import {BodyList} from "./BoduList/BoduList";
import {Button} from "./Button/Button";
import {NewTitle} from "./NewTitle/NewTitle";
import { v1 } from "uuid";

export type ToDoStateType = {
    id: string,
    title: string,
    isDone: boolean
}

type FilterType = 'all' | 'active' | 'completed'

type TodoListType = {
    title: string
}

export const TodoList = (props: TodoListType) => {

    const [toDoState, setToDoState] = useState<Array<ToDoStateType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "TypeScript", isDone: false},
    ])

    const newTitleHandler = (title: string) => {
        let newTitle = {id: v1(), title: title, isDone: false}
        setToDoState([newTitle, ...toDoState])
    }

    const deleteTitleHandler = (id: string) => setToDoState(toDoState.filter((el: ToDoStateType) => el.id !== id))

    const isDoneTitleHandler = (id: string) => {
        let index = toDoState.findIndex((el: ToDoStateType) => el.id === id)
        let state = [...toDoState]
        if (state[index].isDone) {
            state[index].isDone = false
            return setToDoState(state)
        } else {
            state[index].isDone = true
            return setToDoState(state)
        }
    }

    const [filter, setFilter] = useState<FilterType>('all')

    const filterTitleHandler = (filterItem: FilterType) => setFilter(filterItem)

    const filterAffairs = (filter: FilterType, toDoState: Array<ToDoStateType>) => {
        if (filter === 'active') return toDoState.filter((el: ToDoStateType) => !el.isDone)
        else if (filter === 'completed') return toDoState.filter((el: ToDoStateType) => el.isDone)
        else return toDoState
    }

    const filterState = filterAffairs(filter, toDoState)

    return <div className={styles.item}>
        <h3>{props.title}</h3>
        <div className={styles.newTitle}>
            <NewTitle newTitleCallBack={newTitleHandler}/>
        </div>
        <BodyList
            state={filterState}
            deleteCallBack={deleteTitleHandler}
            isDoneCallBack={isDoneTitleHandler}
        />
        <div className={styles.buttonFilter}>
            <Button buttonName={'All'} callBack={() => filterTitleHandler('all')}/>
            <Button buttonName={'Active'} callBack={() => filterTitleHandler('active')}/>
            <Button buttonName={'Completed'} callBack={() => filterTitleHandler('completed')}/>
        </div>
    </div>
}