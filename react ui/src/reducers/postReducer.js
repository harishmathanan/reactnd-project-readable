import {
  POST_LIST_FETCH, POST_LIST_ERROR, POST_LIST_SUCCESS,
  POST_ITEM_FETCH, POST_ITEM_ERROR, POST_ITEM_SUCCESS,
  POST_VOTE_FETCH, POST_VOTE_ERROR, POST_VOTE_SUCCESS,
  POST_CREATE_FETCH, POST_CREATE_ERROR, POST_CREATE_SUCCESS,
  POST_UPDATE_FETCH, POST_UPDATE_ERROR, POST_UPDATE_SUCCESS,
  POST_DELETE_FETCH, POST_DELETE_ERROR, POST_DELETE_SUCCESS,
} from '../actions/types';


const initialState = {
  isFetching: false,
  isError: false,
  message: null,
  posts: [],
  post: null
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LIST_FETCH:
    case POST_ITEM_FETCH:
    case POST_VOTE_FETCH:
    case POST_CREATE_FETCH:
    case POST_UPDATE_FETCH:
    case POST_DELETE_FETCH:
      return {
        ...state,
        isFetching: true,
        isError: false
      };

    case POST_LIST_ERROR:
    case POST_ITEM_ERROR:
    case POST_VOTE_ERROR:
    case POST_CREATE_ERROR:
    case POST_UPDATE_ERROR:
    case POST_DELETE_ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.error
      };

    case POST_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        posts: action.data
      };

    case POST_CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        posts: [...state.posts, action.data]
      };

    case POST_UPDATE_SUCCESS:
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

    case POST_VOTE_SUCCESS:
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

    case POST_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        posts: state.posts.filter((post) => {
          return (post.id !== action.data.id);
        }),
        post: action.data
      };

    case POST_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        post: action.data
      };

    default:
      return state;
  }
};
