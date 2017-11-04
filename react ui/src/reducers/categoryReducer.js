import {
  CATEGORY_FETCH_ACTION,
  CATEGORY_ERROR_ACTION,
  CATEGORY_LIST_SUCCESS_ACTION
} from '../actions/categoryActions';

const initialState = {
  isFetching: false,
  isError: false,
  message: null,
  categoryList: []
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_ACTION:
      return {
        ...state,
        isFetching: true,
        isError: false,
        message: null,
        categoryList: []
      };

    case CATEGORY_ERROR_ACTION:
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.error,
        categoryList: []
      };

    case CATEGORY_LIST_SUCCESS_ACTION:
      return {
        ...state,
        isFetching: false,
        isError: false,
        message: null,
        categoryList: action.data.categories // array is wihtin an object
      };

    default:
      return state;
  }
};
