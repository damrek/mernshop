import { ADD_SNACKBAR, RESET_SNACKBAR } from '../constants/snackbarConstants';

export const snackBarReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case ADD_SNACKBAR:
      return {
        message: action.payload,
      };
    case RESET_SNACKBAR:
      return {};
    default:
      return state;
  }
};
