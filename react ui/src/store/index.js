import { createStore, combineReducers, applyMiddleware } from 'redux';
import { postReducer } from '../reducers/postReducer';
import { categoryReducer } from '../reducers/categoryReducer';
import { commentReducer } from '../reducers/commentReducer';
import thunk from 'redux-thunk';

export const configureStore = () => {
  return createStore(
    combineReducers({
      post: postReducer,
      category: categoryReducer,
      comment: commentReducer
    }),
    applyMiddleware(thunk)
  );
};
