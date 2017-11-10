import axios from 'axios';
import { Config } from '../common/config';
import { generateRandom } from '../common/helpers';
import {
  CATEGORY_FETCH,
  CATEGORY_ERROR,
  CATEGORY_LIST
} from './types';


const categoryFetchAction = () => {
  return {
    type: CATEGORY_FETCH
  };
};

const categoryErrorAction = (error) => {
  return {
    type: CATEGORY_ERROR,
    error
  };
};

const categoryListAction = (data) => {
  return {
    type: CATEGORY_LIST,
    data
  };
};

export const getAllCategories = () => {
  return (dispatch) => {
      dispatch(categoryFetchAction());


      axios.get(`${Config.serverURL}/categories`, {
        headers: {
          'accept': 'application/json',
          'authorization': generateRandom()
        }
      })
      .then((response) => {
        dispatch(categoryListAction(response.data));
      })
      .catch((error) => {
        dispatch(categoryErrorAction(error.message));
      });
  };
};
