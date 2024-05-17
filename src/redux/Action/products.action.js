
import axios from 'axios';
import { BASE_URL } from '../../utilities/Utilities';
import { ADD_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS, REMOVE_PRODUCT } from '../ActionType';

const productLoading = () => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS })
}

const productError = (error) => async (dispatch) => {
    dispatch({ type: ERROR_PRODUCTS, payload: error })
}

export const fetchProducts = (data) => (dispatch) => {
    dispatch(productLoading())
    try {
        axios.get(BASE_URL + 'products')
            .then((response) => {
                dispatch({
                    type: GET_PRODUCTS,
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch(productError(error.message))
            })
    } catch (error) {
        console.log(error);
    }
}

export const removeProducts = (data) => (dispatch) => {
    dispatch(productLoading())
    try {
        axios.delete(BASE_URL + 'products/' + data)
            .then((res) => {
                console.log(res);
                dispatch({ type: REMOVE_PRODUCT, payload: data });
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
};


export const addProducts = (data) => (dispatch) => {
    dispatch(productLoading())
    try {
        axios.post(BASE_URL + 'products', data)
            .then((res) => {
                console.log(res);
                dispatch({ type: ADD_PRODUCTS, payload: res.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }
}

export const editProducts = (data) => (dispatch) => {
    dispatch(productLoading())
    try {
        axios.put(BASE_URL + 'products/' + data.id, data)
            .then((res) => {
                console.log(res);
                dispatch({ type: EDIT_PRODUCTS, payload: data })
            })
    } catch (error) {
        console.log(error);
    }
}

fetchProducts()