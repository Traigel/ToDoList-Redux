import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'fe0bde16-910d-49bc-94ec-281d4e7919c5'
    }
})

export const toDoListAPI = {
    getToDoList() {
        return instance.get('/todo-lists')
    },
    postToDoList(title: string) {
        return instance.post('/todo-lists', {title})
    },
    deleteToDoList(todolistId: string) {
        return instance.delete(`/todo-lists/${todolistId}`)
    },
    putToDoLists(todolistId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}`, {title})
    }
}

export const tasksAPI = {
    getTask(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    postTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    putTask(todolistId: string, taskId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}