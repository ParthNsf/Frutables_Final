import { ADD_TO_CART } from "../ActionType"


const initialState = {
    cart: [{
        id: 1,
        name: "apple",
        price: 10
    }],
    isLoading: false,
    error: null
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: state.cart.concat(action.payload),
            }
        default:
            return state
    }
}

