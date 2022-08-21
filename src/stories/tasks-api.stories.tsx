import React, {useEffect, useState} from 'react';
import {tasksAPI} from "../api/api";

export default {                    //по дефолту создаётся компонент в StoryBook
    title: 'Api/Tasks'     //имя папки и в ней раздел
}

export const GetTask = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        tasksAPI.getTask('e85b39c5-c325-4647-8b71-787910c25158')
            .then(res => {
                setState(res.data.items)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const PostTask = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        tasksAPI.postTask('e85b39c5-c325-4647-8b71-787910c25158', 'New Task')
            .then(res => {
                setState(res.data.data.item)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        tasksAPI.deleteTask('e85b39c5-c325-4647-8b71-787910c25158', 'ecc60145-a939-4d2d-9d70-e57c176625f2')
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const PutToTask = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        tasksAPI.putTask('e85b39c5-c325-4647-8b71-787910c25158', '2c0cbb80-bd26-4266-bbcf-a39ab274a766', 'Task name')
            .then(res => {
                setState(res.data.data.item)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}