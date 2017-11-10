import {
  CATEGORY_FETCH,
  CATEGORY_ERROR,
  CATEGORY_LIST
} from '../actions/types';

const initialState = {
  isFetching: false,
  isError: false,
  message: null,
  categories: []
};

export const categoryReducer = (state = initialState, action) => {

  switch (action.type) {
    case CATEGORY_FETCH:
      return {
        ...state,
        isFetching: true,
        isError: false
      };

    case CATEGORY_ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.error
      };

    case CATEGORY_LIST:
      return {
        ...state,
        isFetching: false,
        isError: false,
        message: null,
        categories: action.data.categories // array is wihtin an object
      };

    default:
      return state;
  }
};
