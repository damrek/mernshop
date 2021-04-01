import { ADD_SNACKBAR, RESET_SNACKBAR } from '../constants/snackbarConstants';

export const addSnackBarMsg = (message) => async (dispatch) => {
  dispatch({ type: ADD_SNACKBAR, payload: message });
};

export const resetSnackBarMsg = () => async (dispatch) => {
  dispatch({ type: RESET_SNACKBAR });
};
