import { DELETE_GROCERIES, EDIT_GROCERIES, GROCERIES_DATA } from "../ActionType"

const initialState = {
    groceries: [],
    isLoading: false,
    error: null
}

export const groceriesReducer = (state = initialState, action) => {

    switch (action.type) {
        case GROCERIES_DATA:
            return {
                ...state,
                groceries: state.groceries.concat(action.payload)
            }
        case DELETE_GROCERIES:
            return {
                ...state,
                groceries: state.groceries.filter((item) => item.id !== action.payload)
            }
        case EDIT_GROCERIES:
            return {
                ...state,
                groceries: state.groceries.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    }
                })
            }
        default:
            return state
    }
}