import { Config } from '../common/config';
import { generateRandom } from '../common/helpers';

export const CATEGORY_FETCH_ACTION = 'CATEGORY_FETCH_ACTION';
export const CATEGORY_ERROR_ACTION = 'CATEGORY_ERROR_ACTION';
export const CATEGORY_LIST_SUCCESS_ACTION = 'CATEGORY_LIST_SUCCESS_ACTION';

const categoryFetch = () => {
  return {
    type: CATEGORY_FETCH_ACTION
  };
};

const categoryError = (error) => {
  return {
    type: CATEGORY_ERROR_ACTION,
    error
  };
};

const categoryListSuccess = (data) => {
  return {
    type: CATEGORY_LIST_SUCCESS_ACTION,
    data
  };
};

export const getCategoryList = () => {
  let request = new Request(Config.serverUrl + '/categories', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(categoryFetch());

    fetch(request)
    .then((response) => response.json())
    .then((data) => {
      dispatch(categoryListSuccess(data));
    })
    .catch((error) => {
      dispatch(categoryError(error.name + ' - ' + error.message));
    });
  };
};
