
import axios from "axios"
import { ADD_FEEDBACK, DELETE_REVIEW, EDIT_REVIEW, GET_FEEDBACK } from "../ActionType"

export const feedbackData = (data) => async (dispatch) => {
    try {
        await axios.post('http://localhost:8000/userFeedBack', data)
            .then((response) => {
                // console.log(response.data);
                dispatch({ type: ADD_FEEDBACK, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

export const displayFeedback = () => async (dispatch) => {
    try {
        await axios.get('http://localhost:8000/userFeedBack')
            .then((response) => {
                // console.log(response.data);
                dispatch({ type: GET_FEEDBACK, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }
}

export const removeReview = (id) => async (dispatch) => {
    try {
        axios.delete('http://localhost:8000/userFeedBack/' + id)
            .then((response) => {
                // console.log(response.data);
                dispatch({ type: DELETE_REVIEW, payload: id })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }
}

export const editReview = (data) => async (dispatch) => {
    try {
        axios.put('http://localhost:8000/userFeedBack/' + data.id, data)
            .then((response) => {
                // console.log(response.data);
                dispatch({ type: EDIT_REVIEW, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }
}