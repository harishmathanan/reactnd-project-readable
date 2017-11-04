import { Config } from '../common/config';
import { generateRandom } from '../common/helpers';
import {
  COMMENT_LIST_FETCH, COMMENT_LIST_ERROR, COMMENT_LIST_SUCCESS,
  COMMENT_CREATE_FETCH, COMMENT_CREATE_ERROR, COMMENT_CREATE_SUCCESS,
  COMMENT_UPDATE_FETCH, COMMENT_UPDATE_ERROR, COMMENT_UPDATE_SUCCESS,
  COMMENT_DELETE_FETCH, COMMENT_DELETE_ERROR, COMMENT_DELETE_SUCCESS,
  COMMENT_VOTE_FETCH, COMMENT_VOTE_ERROR, COMMENT_VOTE_SUCCESS
} from './types';

const commentListFetch = () => {
  return {
    type: COMMENT_LIST_FETCH
  };
};

const commentListError = (error) => {
  return {
    type: COMMENT_LIST_ERROR,
    error
  };
};

const commentListSuccess = (data) => {
  return {
    type: COMMENT_LIST_SUCCESS,
    data
  };
};

export const getCommentList = (postId) => {
  let request = new Request(`${Config.serverUrl}/posts/${postId}/comments`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(commentListFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(commentListSuccess(data));
      })
      .catch((error) => {
        dispatch(commentListError(error.name + ' - ' + error.message));
      });
  };
}

const commentCreateFetch = () => {
  return {
    type: COMMENT_CREATE_FETCH
  };
};

const commentCreateError = (error) => {
  return {
    type: COMMENT_CREATE_ERROR,
    error
  };
};

const commentCreateSuccess = (data) => {
  return {
    type: COMMENT_CREATE_SUCCESS,
    data
  };
};

// POST /comments
export const createCommentItem = (comment) => {
  let request = new Request(`${Config.serverUrl}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(commentCreateFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(commentCreateSuccess(data));
      })
      .catch((error) => {
        dispatch(commentCreateError(error.name + ' - ' + error.message));
      });
  };
};

const commentUpdateFetch = () => {
  return {
    type: COMMENT_UPDATE_FETCH
  };
};

const commentUpdateError = (error) => {
  return {
    type: COMMENT_UPDATE_ERROR,
    error
  };
};

const commentUpdateSuccess = (data) => {
  return {
    type: COMMENT_UPDATE_SUCCESS,
    data
  };
};

// PUT /comments/:id
export const updateCommentItem = (commentId, comment) => {
  let request = new Request(`${Config.serverUrl}/comments/${commentId}`, {
    method: 'PUT',
    body: JSON.stringify(comment),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(commentUpdateFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(commentUpdateSuccess(data));
      })
      .catch((error) => {
        dispatch(commentUpdateError(error.name + ' - ' + error.message));
      });
  };
};

const commentDeleteFetch = () => {
  return {
    type: COMMENT_DELETE_FETCH
  };
};

const commentDeleteError = (error) => {
  return {
    type: COMMENT_DELETE_ERROR,
    error
  };
};

const commentDeleteSuccess = (data) => {
  return {
    type: COMMENT_DELETE_SUCCESS,
    data
  };
};

// DELETE /comments/:id
export const deleteCommentItem = (commentId) => {
  let request = new Request(`${Config.serverUrl}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(commentDeleteFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(commentDeleteSuccess(data));
      })
      .catch((error) => {
        dispatch(commentDeleteError(error.name + ' - ' + error.message));
      });
  };
};

const commentVoteFetch = () => {
  return {
    type: COMMENT_VOTE_FETCH
  };
};

const commentVoteError = (error) => {
  return {
    type: COMMENT_VOTE_ERROR,
    error
  };
};

const commentVoteSuccess = (data) => {
  return {
    type: COMMENT_VOTE_SUCCESS,
    data
  };
};

// POST /comments/:id
export const voteCommentItem = (commentId, voteOption) => {
  let request = new Request(`${Config.serverUrl}/comments/${commentId}`, {
    method: 'POST',
    body: JSON.stringify(voteOption),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': generateRandom()
    }
  });

  return (dispatch) => {
    dispatch(commentVoteFetch());

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        dispatch(commentVoteSuccess(data));
      })
      .catch((error) => {
        dispatch(commentVoteError(error.name + ' - ' + error.message));
      });
  };
};
