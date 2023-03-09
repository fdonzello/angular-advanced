import { createAction, createFeature, createReducer, on, props } from "@ngrx/store";

interface Request {
    status: 'loading' | 'failed' | 'idle';
    amount: number;
    failureReason: string | undefined;
}

interface BankAccountState {
    balance: number;
    request: Request | undefined;
}

const initialState: BankAccountState = {
    balance: 0,
    request: undefined
}

interface SuccessProps {
    newBalance: number
}

export const depositAction = createAction('[Dashboard Page] Deposit', props<{ amount: number }>())
export const depositSuccessAction = createAction('[Bank Effect] Deposit Success', props<SuccessProps>())
export const depositFailedAction = createAction('[Bank Effect] Deposit Failed', props<{ reason: string }>())

export const withdrawAction = createAction('[Dashboard Page] Withdraw', props<{ amount: number }>())
export const withdrawSuccessAction = createAction('[Bank Effect] Withdraw Success', props<SuccessProps>())
export const withdrawFailedAction = createAction('[Bank Effect] Withdraw Failed', props<{ reason: string }>())

export const resetRequestAction = createAction('[On Bank Component Destroy] Reset Request')

export const bankAccountFeature = createFeature({
    name: 'bank',
    reducer: createReducer(
        initialState,

        on(depositAction, withdrawAction, (state, { amount }) => ({
            ...state,
            request: {
                amount: amount,
                status: 'loading',
                failureReason: undefined
            }
        })),

        on(depositFailedAction, withdrawFailedAction, (state, { reason }) => ({
            ...state,
            request: {
                ...state.request!,
                status: 'failed',
                failureReason: reason
            }
        })),

        on(depositSuccessAction, withdrawSuccessAction, (state, { newBalance }) => ({
            balance: newBalance,
            request: undefined
        })),

        on(resetRequestAction, (state) => ({
            balance: state.balance,
            request: undefined
        }))
    )
})

export const { selectBalance, selectRequest } = bankAccountFeature;