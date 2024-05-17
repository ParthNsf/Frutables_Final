import { combineReducers } from "redux"
import { facilityReducer } from "./facility.reducer"
import { groceriesReducer } from "./groceries.reducer"
import { productsReducer } from "./products.reducer"
import { feedbackReducer } from "./review.reducer"
import { cartReducer } from "./cart.reducer"
import counterSlice from "../../reduxToolkit/counterSlice"
import cartSlice from "../../reduxToolkit/cartSlice"
import couponSlice from "../../reduxToolkit/couponSlice"

export const rootReducer = combineReducers({
    fruitFacilities: facilityReducer,
    groceriesStore: groceriesReducer,
    productInAdmin: productsReducer,
    feedBackServer: feedbackReducer,
    cartReducerinCart: cartReducer,
    counterToolkit: counterSlice,
    cartinToolkit: cartSlice,
    couponInCart: couponSlice
})