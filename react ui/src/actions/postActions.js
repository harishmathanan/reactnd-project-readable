import { Config } from '../common/config';
import { generateRandom } from '../common/helpers';
import {
  POST_LIST_FETCH, POST_LIST_ERROR, POST_LIST_SUCCESS,
  POST_CREATE_FETCH, POST_CREATE_ERROR, POST_CREATE_SUCCESS,
  POST_UPDATE_FETCH, POST_UPDATE_ERROR, POST_UPDATE_SUCCESS,
  POST_DELETE_FETCH, POST_DELETE_ERROR, POST_DELETE_SUCCESS,
  POST_ITEM_FETCH, POST_ITEM_ERROR, POST_ITEM_SUCCESS,
  POST_VOTE_FETCH, POST_VOTE_ERROR, POST_VOTE_SUCCESS
} from './types';

const postListFetch = () => {
  return {
    type: POST_LIST_FETCH
  };
};

const postListError = (error) => {
  return {
    type: POST_LIST_ERROR,
    error
  };
};

const postListSuccess = (data) => {
  return {
    type: POST_LIST_SUCCESS,
    data
  };
};

/**
 * GET /posts
 */
export const getPostList = () => {
  let request = new Request(Config.serverUrl + '/posts', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(postListFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(postListSuccess(data));
      })
      .catch((error) => {
        dispatch(postListError(error.name + ' - ' + error.message));
      });
  };
};

/**
 * GET /:category/posts
 * @param {string} category
 */
export const getPostListByCategory = (category) => {
  let request = new Request(`${Config.serverUrl}/${category}/posts`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(postListFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(postListSuccess(data));
      })
      .catch((error) => {
        dispatch(postListError(error.name + ' - ' + error.message));
      });
  };
};


const postCreateFetch = () => {
  return {
    type: POST_CREATE_FETCH
  };
};

const postCreateError = (error) => {
  return {
    type: POST_CREATE_ERROR,
    error
  };
};

const postCreateSuccess = (data) => {
  return {
    type: POST_CREATE_SUCCESS,
    data
  };
};

/**
 * POST /post
 * @param {object} post
 */
export const createPostItem = (post) => {
  let request = new Request(`${Config.serverUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(postCreateFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(postCreateSuccess(data));
      })
      .catch((error) => {
        dispatch(postCreateError(error.name + ' - ' + error.message));
      });
  };
};

export const postUpdateFetch = () => {
  return {
    type: POST_UPDATE_FETCH
  };
};

export const postUpdateError = (error) => {
  return {
    type: POST_UPDATE_ERROR,
    error
  };
};

export const postUpdateSuccess = (data) => {
  return {
    type: POST_UPDATE_SUCCESS,
    data
  };
};

/**
 * PUT /posts/:id
 * @param {string} postId
 * @param {object} post
 */
export const updatePostItem = (postId, post) => {
  let request = new Request(`${Config.serverUrl}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(postUpdateFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(postUpdateSuccess(data));
      })
      .catch((error) => {
        dispatch(postUpdateError(error.name + ' - ' + error.message));
      });
  };
};

export const postDeleteFetch = () => {
  return {
    type: POST_DELETE_FETCH
  };
};

export const postDeleteError = (error) => {
  return {
    type: POST_DELETE_ERROR,
    error
  };
};

export const postDeleteSuccess = (data) => {
  return {
    type: POST_DELETE_SUCCESS,
    data
  };
};

/**
 * DELETE /posts/:id
 * @param {string} postId
 */
export const deletePostItem = (postId) => {
  let request = new Request(`${Config.serverUrl}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(postDeleteFetch());

    fetch(request)
    .then((response) => response.json())
    .then((data) => {
      dispatch(postDeleteSuccess(data));
    })
    .catch((error) => {
      dispatch(postDeleteError(error.name + ' - ' + error.message));
    });
  };
};

export const postItemFetch = () => {
  return {
    type: POST_ITEM_FETCH
  };
};

export const postItemError = (error) => {
  return {
    type: POST_ITEM_ERROR,
    error
  };
};

export const postItemSuccess = (data) => {
  return {
    type: POST_ITEM_SUCCESS,
    data
  };
};

/**
 * GET /posts/:id
 * @param {string} postId
 */
export const getPostItem = (postId) => {
  let request = new Request(`${Config.serverUrl}/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(postItemFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(postItemSuccess(data));
      })
      .catch((error) => {
        dispatch(postItemError(error.name + ' - ' + error.message));
      });
  };
};

export const postVoteFetch = () => {
  return {
    type: POST_VOTE_FETCH
  };
};

export const postVoteError = (error) => {
  return {
    type: POST_VOTE_ERROR,
    error
  };
};

export const postVoteSuccess = (data) => {
  return {
    type: POST_VOTE_SUCCESS,
    data
  };
};

/**
 * POST /posts/:id
 * @param {string} postId
 * @param {object} voteOption { option: 'upVote' or 'downVote' }
 */
export const votePostItem = (postId, voteOption) => {
  let request = new Request(`${Config.serverUrl}/posts/${postId}`, {
    method: 'POST',
    body: JSON.stringify(voteOption),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(postVoteFetch());

    fetch(request)
    .then((response) => response.json())
    .then((data) => {
      dispatch(postVoteSuccess(data));
    })
    .catch((error) => {
      dispatch(postVoteError(error.name + ' - ' + error.message));
    });
  };
};

