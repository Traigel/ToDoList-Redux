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
        return instance.get<ToDoListType[]>('/todo-lists')
    },
    createToDoList(title: string) {
        return instance.post<CommonTodoResponseType<RootToDoListData>>('/todo-lists', {title})
    },
    deleteToDoList<CommonTodoResponseType>(todolistId: string) {
        return instance.delete<CommonTodoResponseType>(`/todo-lists/${todolistId}`)
    },
    updateToDoLists(todolistId: string, title: string) {
        return instance.put<CommonTodoResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}

export const tasksAPI = {
    getTask(todolistId: string) {
        return instance.get<GetTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonTaskResponseType<RootTaskData>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonTaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonTaskResponseType<RootTaskData>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export type CommonTodoResponseType<T = {}> = {
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
    data: T;
}

export type RootToDoListData = {
    item: ToDoListType;
}

export type ToDoListType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}



export type CommonTaskResponseType<T = {}> = {
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
    data: T;
}

export type RootTaskData = {
    item: TasksType;
}

export type GetTaskType = {
    items: TasksType[];
    totalCount: number;
    error?: any;
}

export type TasksType = {
    id: string;
    title: string;
    description?: any;
    todoListId: string;
    order: number;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate?: any;
    deadline?: any;
    addedDate: string;
}

export enum TaskStatuses {
    New = 0,
    InPProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}