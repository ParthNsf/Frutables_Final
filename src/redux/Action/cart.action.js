import { ADD_TO_CART } from "../ActionType"

export const addToCart = (data) => (dispatch) => {
    dispatch({ type: ADD_TO_CART, payload: data })
}