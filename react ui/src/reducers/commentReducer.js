import {
  COMMENT_LIST_FETCH, COMMENT_LIST_ERROR, COMMENT_LIST_SUCCESS,
  COMMENT_CREATE_FETCH, COMMENT_CREATE_ERROR, COMMENT_CREATE_SUCCESS,
  COMMENT_UPDATE_FETCH, COMMENT_UPDATE_ERROR, COMMENT_UPDATE_SUCCESS,
  COMMENT_DELETE_FETCH, COMMENT_DELETE_ERROR, COMMENT_DELETE_SUCCESS,
  COMMENT_VOTE_FETCH, COMMENT_VOTE_ERROR, COMMENT_VOTE_SUCCESS
} from '../actions/types';

const initialState = {
  isFetching: false,
  isError: false,
  message: null,
  comments: []
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_LIST_FETCH:
    case COMMENT_VOTE_FETCH:
    case COMMENT_CREATE_FETCH:
    case COMMENT_UPDATE_FETCH:
    case COMMENT_DELETE_FETCH:
      return {
        ...state,
        isFetching: true,
        isError: false
      };

    case COMMENT_LIST_ERROR:
    case COMMENT_VOTE_ERROR:
    case COMMENT_CREATE_ERROR:
    case COMMENT_UPDATE_ERROR:
    case COMMENT_DELETE_ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.error
      };

    case COMMENT_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        comments: action.data
      };

    case COMMENT_CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        comments: [...state.comments, action.data]
      };

    case COMMENT_UPDATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        comments: state.comments.map((comment) => {
          return (
            comment.id === action.data.id
              ? action.data
              : comment
          );
        })
      };

    case COMMENT_VOTE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        comments: state.comments.map((comment) => {
          return (
            comment.id === action.data.id
              ? action.data
              : comment
          );
        })
      };

    case COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        comments: state.comments.filter((comment) => {
          return (comment.id !== action.data.id);
        })
      };

    default:
      return state;
  }
};
