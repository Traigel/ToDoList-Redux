const initialState: InitialStateType = {
    status: 'succeeded',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

// action create
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

// type
type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

type SetStatusType = ReturnType<typeof setAppStatusAC>
type SetErrorType = ReturnType<typeof setAppErrorAC>
export type AppActionsType = SetStatusType | SetErrorType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'