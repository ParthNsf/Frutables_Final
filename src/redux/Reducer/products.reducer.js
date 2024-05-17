import { ADD_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS, REMOVE_PRODUCT } from "../ActionType";

const initialState = {
    products: [],
    isLoading: false,
    error: null
}

export const productsReducer = (state = initialState, action) => {
    // console.log(action, "reducer");

    // console.log(state, "reducer");

    switch (action.type) {
        case ERROR_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case LOADING_PRODUCTS:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                error: null
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                products: state.products.filter((item) => item.id !== action.payload),
                error: null
            }
        case EDIT_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: state.products.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                }),
                error: null
            }
        case ADD_PRODUCTS:
            return {

                ...state,
                isLoading: false,
                products: state.products.concat(action.payload),
                error: null
            }
        default:
            return state
    }
}