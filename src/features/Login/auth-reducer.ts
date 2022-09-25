import {authAPI, LoginParamsType, MeType, RESULT_CODES} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/errors-utils";
import axios from 'axios';
import {AppThunk} from "../../app/store";

const initialState = {
    isLoggedIn: false,  // если true (залогинены) показывается TodoLists
    id: null as number | null,
    login: null as string | null,
    email: null as string | null
}

export const authReducer = (state = initialState, action: AuthActionsType): AuthInitialStateType => {
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
export const setUserInfoAC = (date: MeType) => ({type: 'AUTH/SET-USER', date} as const)

// thunks
export const loginTC = (date: LoginParamsType): AppThunk => async (dispatch) => {
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
export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC("succeeded"))
            // dispatch(setUserInAC({email: null, login: null, id: null}))
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
export type AuthInitialStateType = typeof initialState
type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
type SetUserInType = ReturnType<typeof setUserInfoAC>
export type AuthActionsType = SetIsLoggedInType | SetUserInType