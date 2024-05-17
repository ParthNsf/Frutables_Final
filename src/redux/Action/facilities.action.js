import { DELETE_DATA, DELETE_GROCERIES, EDIT_DATA, EDIT_GROCERIES, FACILITIES_DATA, GET_FACILITIES, GROCERIES_DATA, LOADING_FACILITY, START_LOADING, STOP_LOADING } from "../ActionType"

const handleLoading = () => (dispatch) => {
  dispatch({ type: LOADING_FACILITY })
}

export const addfacilities = (data) => (dispatch) => {
  dispatch(handleLoading())

  setTimeout(() => {
    dispatch({ type: FACILITIES_DATA, payload: data })
  }, 2000)
}

export const deleteData = (data) => (dispatch) => {
  dispatch({ type: DELETE_DATA, payload: data })
}

export const editData = (data) => (dispatch) => {
  dispatch({ type: EDIT_DATA, payload: data })
}

export const getFacilities = () => (dispatch) => {
  dispatch({type: GET_FACILITIES})
}

export const addGroceries = (data) => (dispatch) => {
  dispatch({type: GROCERIES_DATA, payload: data})
}

export const deleteGroceries = (data) => (dispatch) => {
  dispatch({type: DELETE_GROCERIES, payload: data})
}

export const editGroceries = (data) => (dispatch) => {
  dispatch({type: EDIT_GROCERIES, payload: data})
}