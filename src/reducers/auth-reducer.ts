import {authAPI, LoginParamsType, MeType, RESULT_CODES} from "../api/api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../components/utils/errors-utils";
import axios from 'axios';

const initialState: InitialStateType = {
    isLoggedIn: false,  // если true (залогинены) показывается TodoLists
    id: null,
    login: null,
    email: null
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "AUTH/SET-USER":
            return {...state, id: action.date.id, login: action.date.login, email: action.date.email}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setUserInAC = (date: MeType) => ({type: 'AUTH/SET-USER', date} as const)

// thunks
export const loginTC = (date: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(date)
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
        }
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setUserInAC({email: null, login: null, id: null}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
        }
    }
}

// type
type InitialStateType = {
    isLoggedIn: boolean
    id: number | null
    email: string | null
    login: string | null
}

type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
type SetUserInType = ReturnType<typeof setUserInAC>

export type AuthActionsType = SetIsLoggedInType | SetUserInType