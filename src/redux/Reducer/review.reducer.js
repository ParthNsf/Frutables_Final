import { ADD_FEEDBACK, DELETE_REVIEW, EDIT_REVIEW, GET_FEEDBACK } from "../ActionType"

const initialState = {
    feedback: [],
    isLoading: false,
    error: null
}

export const feedbackReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case ADD_FEEDBACK:
            return {
                ...state,
                feedback: state.feedback.concat(action.payload),
            }
        case GET_FEEDBACK:
            return {
                ...state,
                feedback: action.payload,
            }
        case EDIT_REVIEW:
            return {
                ...state,
                feedback: state.feedback.map((v) => v.id == action.payload.id ? action.payload : v)
            }
        case DELETE_REVIEW:
            return {
                ...state,
                feedback: state.feedback.filter((item) => item.id !== action.payload)
            }
        default:
            return state
    }
}