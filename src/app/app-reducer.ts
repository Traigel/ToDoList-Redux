import {Dispatch} from "redux";
import {authAPI, RESULT_CODES} from "../api/api";
import {handleServerAppError, handleServerNetworkError} from "../common/utils/errors-utils";
import {setIsLoggedInAC, setUserInfoAC} from "../features/Login/auth-reducer";
import axios from 'axios';

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
    isInitialized: false // крутика работает пока приложение загружается
}

export const appReducer = (state = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IN-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IN-INITIALIZED', isInitialized} as const)

// thunks
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserInfoAC(res.data.data))
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
        }
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}

// type
export type AppInitialStateType = typeof initialState
type SetStatusType = ReturnType<typeof setAppStatusAC>
type SetErrorType = ReturnType<typeof setAppErrorAC>
type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>
export type AppActionsType = SetStatusType | SetErrorType | SetIsInitializedType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'