import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../reducers/app-reducer";
import {ResponseType} from "../../api/api";

export const handleServerNetworkError = (error: string, dispatch: Dispatch) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC("failed"))
}