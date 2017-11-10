import {
  COMMENT_FETCH,
  COMMENT_ERROR,
  COMMENT_LIST,
  COMMENT_VOTE,
  COMMENT_CREATE,
  COMMENT_UPDATE,
  COMMENT_DELETE
} from '../actions/types';

const initialState = {
  isFetching: false,
  isError: false,
  message: null,
  comments: []
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {

    case COMMENT_FETCH:
      return {
        ...state,
        isFetching: true,
        isError: false
      };

    case COMMENT_ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.error
      };

    case COMMENT_LIST:
      return {
        ...state,
        isFetching: false,
        isError: false,
        comments: action.data
      };

    case COMMENT_VOTE:
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

    case COMMENT_CREATE:
      return {
        ...state,
        isFetching: false,
        isError: false,
        comments: [
          ...state.comments,
          action.data
        ]
      };

    case COMMENT_UPDATE:
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

    case COMMENT_DELETE:
      return {
        ...state,
        isFetching: false,
        isError: false,
        comments: state.comments.filter((comment) => {
          return (comment.id !== action.data.id);
        })
      }

    default:
      return state;
  }
};
