import React, {useEffect, useState} from 'react';
import {toDoListAPI} from "../api/api";

export default {                    //по дефолту создаётся компонент в StoryBook
    title: 'Api/ToDoLists'     //имя папки и в ней раздел
}

export const GetToDoList = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        toDoListAPI.getToDoList()
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const PostToDoList = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        toDoListAPI.postToDoList('New ToDo List')
            .then(res => {
                setState(res.data.data.item)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteToDoList = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        toDoListAPI.deleteToDoList('6782cb5a-b41d-45b3-a248-860f53fa16c6')
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const PutToDoList = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        toDoListAPI.putToDoLists('532b6c39-dc5a-4c81-afc8-55bc5be0bd90', 'New ToDo List')
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}