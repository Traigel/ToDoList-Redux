import {AppInitialStateType, appReducer, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./app-reducer";

let initialState: AppInitialStateType

beforeEach(() => {
    initialState = {
        status: "succeeded",
        error: null,
        isInitialized: false
    }
})

test('set app status', () => {
    const testAppReducer = appReducer(initialState, setAppStatusAC("loading"))
    expect(testAppReducer.status).toBe("loading")
})

test('set app error', () => {
    const testAppReducer = appReducer(initialState, setAppErrorAC("Error message"))
    expect(testAppReducer.error).toBe("Error message")
})

test('set is initialized', () => {
    const testAppReducer = appReducer(initialState, setIsInitializedAC(true))
    expect(testAppReducer.isInitialized).toBe(true)
})
