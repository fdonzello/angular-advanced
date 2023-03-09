import { createAction, createReducer, on, props } from "@ngrx/store";
import { AuthState } from "../reducers";


const initialState: AuthState = {
    isLoggedIn: false,
    status: 'idle'
}

export const loginAction = createAction('[Login Page] Login', props<{
    email: string,
    password: string
}>());

export const loginSuccessAction = createAction('[Auth Effect] Login Success', props<{
    username: string
}>());

export const loginFailedAction = createAction('[Auth Effect] Login Failed', props<{ reason: string }>());

export const logoutAction = createAction('[Navigation] Logout')

export const authReducer = createReducer(
    initialState,

    on(loginAction, (state) => ({
        ...state,
        status: 'loading'
    })),

    on(loginSuccessAction, (_, { username }) => ({
        isLoggedIn: true,
        username: username,
        status: 'idle'
    })),

    on(loginFailedAction, (_) => ({
        isLoggedIn: true,
        status: 'failed'
    })),


    on(logoutAction, () => initialState),
)