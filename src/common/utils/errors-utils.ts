import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {ResponseType} from "../../api/api";
import {AppRootActionsType} from "../../app/store";

export const handleServerNetworkError = (error: string, dispatch: Dispatch<AppRootActionsType>) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<AppRootActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC("failed"))
}