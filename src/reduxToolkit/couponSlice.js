import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    coupon: [],
    isLoading: false,
    error: null
};

export const couponSlice = createSlice({
    name: "coupon",
    initialState: initialState,
    reducers: {
        getCouponStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getCouponSuccess: (state, action) => {
            state.coupon = action.payload;
            state.isLoading = false;
        },
        getCouponFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addCouponStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addCouponSuccess: (state, action) => {
            state.coupon = action.payload;
            state.isLoading = false;
        },
        addCouponFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        removeCouponStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        removeCouponSuccess: (state, action) => {
            state.coupon = state.coupon.filter((item) => item.id !== action.payload);
            state.isLoading = false;
        },
        removeCouponFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateCouponStart: (state) => {
            state.isLoading = true;
        },
        updateCouponSuccess: (state, action) => {
            state.coupon = state.coupon.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                } else {
                    return item;
                }
            });
            state.isLoading = false;
        },
        updateCouponFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },

});

export const { getCouponStart, getCouponSuccess, getCouponFailure, addCouponStart, addCouponSuccess, addCouponFailure, removeCouponStart, removeCouponSuccess, removeCouponFailure, updateCouponStart, updateCouponSuccess, updateCouponFailure } = couponSlice.actions;

export const getCoupon = () => async (dispatch) => {
    dispatch(getCouponStart());
    try {
        const response = await axios.get("http://localhost:8000/couponCode");
        dispatch(getCouponSuccess(response.data));
    } catch (error) {
        dispatch(getCouponFailure(error.message));
    }
};

export const addCoupon = (couponData) => async (dispatch) => {
    dispatch(addCouponStart());
    try {
        const response = await axios.post("http://localhost:8000/couponCode", couponData);
        dispatch(addCouponSuccess(response.data));
    } catch (error) {
        dispatch(addCouponFailure(error.message));
    }
};

export const removeCoupon = (id) => async (dispatch) => {
    dispatch(removeCouponStart());
    try {
        await axios.delete(`http://localhost:8000/couponCode/${id}`);
        dispatch(removeCouponSuccess(id));
    } catch (error) {
        dispatch(removeCouponFailure(error.message));
    }
}

export const updateCoupon = (id, couponData) => async (dispatch) => {
    dispatch(updateCouponStart());
    try {
        const response = await axios.put(`http://localhost:8000/couponCode/${id}`, couponData);
        dispatch(updateCouponSuccess(response.data));
    } catch (error) {
        dispatch(updateCouponFailure(error.message));
    }
};

export default couponSlice.reducer;
