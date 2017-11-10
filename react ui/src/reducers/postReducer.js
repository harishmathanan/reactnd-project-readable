import {
  POST_FETCH,
  POST_ERROR,
  POST_LIST,
  POST_ITEM,
  POST_VOTE,
  POST_CREATE,
  POST_UPDATE,
  POST_DELETE
} from '../actions/types';

const initialState = {
  isFetching: false,
  isError: false,
  message: null,
  posts: [],
  post: {}
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case POST_FETCH:
      return {
        ...state,
        isFetching: true,
        isError: false
      };

    case POST_ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.error
      };

    case POST_LIST:
      return {
        ...state,
        isFetching: false,
        isError: false,
        posts: action.data
      };

    case POST_ITEM:
      return {
        ...state,
        isFetching: false,
        isError: false,
        posts: state.posts,
        post: action.data
      };

    case POST_VOTE:
      return {
        ...state,
        isFetching: false,
        isError: false,
        posts: state.posts.map((post) => {
          return (
            post.id === action.data.id
              ? action.data
              : post
          );
        }),
        post: action.data
      };

    case POST_CREATE:
      return {
        ...state,
        isFetching: false,
        isError: false,
        posts: [
          ...state.posts,
          action.data
        ]
      };

    case POST_UPDATE:
      return {
        ...state,
        isFetching: false,
        isError: false,
        posts: state.posts.map((post) => {
          return (
            post.id === action.data.id
              ? action.data
              : post
          );
        })
      };

    case POST_DELETE:
      return {
        ...state,
        isFetching: false,
        isError: false,
        posts: state.posts.filter((post) => {
          return (post.id !== action.data.id);
        })
      };

    default:
      return state;
  }
};
