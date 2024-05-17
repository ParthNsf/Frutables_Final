import { DELETE_DATA, EDIT_DATA, FACILITIES_DATA, GET_FACILITIES, LOADING_FACILITY } from "../ActionType";

const initialState = {
    facility: [],
    isLoading: false,
    error: null
}

export const facilityReducer = (state = initialState, action) => {
    // console.log(action);

    switch (action.type) {
        case LOADING_FACILITY:
            return {
                ...state,
                isLoading: true
            }
        case FACILITIES_DATA:
            return {
                ...state,
                facility: state.facility.concat(action.payload),
                isLoading: false
            }
        case DELETE_DATA:
            return {
                ...state,
                facility: state.facility.filter((item) => item.id !== action.payload),
                isLoading: false
            }
        case EDIT_DATA:
            return {
                ...state,
                facility: state.facility.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    }
                }),
                isLoading: false
            };
        case GET_FACILITIES:
            return {
                ...state
            }
        default:
            return state
    }

}
