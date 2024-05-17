import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carting: [],
    isLoading: false,
    error: null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCarting: (state, action) => {
            const { id, count } = action.payload;
            const index = state.carting.findIndex((item) => item.pId === id);

            if (index !== -1) {
                state.carting[index].quantity += count;
            } else {
                state.carting.push({ pId: id, quantity: count });
            }
        },

        incrementQuantity: (state, action) => {
            const index = state.carting.findIndex((item) => item.pId === action.payload);

            state.carting[index].quantity++;

        },
        decrementQuantity: (state, action) => {
            const index = state.carting.findIndex((item) => item.pId === action.payload);

            if (state.carting[index].quantity > 1) {
                state.carting[index].quantity--;
            }

        },
        removeFromCart: (state, action) => {
            state.carting = state.carting.filter((item) => item.pId !== action.payload);
        }
    }
});

export const { addToCarting, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
