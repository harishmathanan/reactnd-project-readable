import axios from 'axios';
import { Config } from '../common/config';
import {
  COMMENT_FETCH,
  COMMENT_ERROR,
  COMMENT_LIST,
  COMMENT_VOTE,
  COMMENT_CREATE,
  COMMENT_UPDATE,
  COMMENT_DELETE
} from './types';

const commentFetchAction = () => {
  return {
    type: COMMENT_FETCH
  };
};

const commentErrorAction = (error) => {
  return {
    type: COMMENT_ERROR,
    error
  };
};

const commentListAction = (data) => {
  return {
    type: COMMENT_LIST,
    data
  };
};

const commentVoteAction = (data) => {
  return {
    type: COMMENT_VOTE,
    data
  };
};

const commentCreateAction = (data) => {
  return {
    type: COMMENT_CREATE,
    data
  };
};

const commentUpdateAction = (data) => {
  return {
    type: COMMENT_UPDATE,
    data
  };
};

const commentDeleteAction = (data) => {
  return {
    type: COMMENT_DELETE,
    data
  };
};

export const getAllComments = (postId) => {
  return (dispatch) => {
    dispatch(commentFetchAction());

    axios.get(`${Config.serverURL}/posts/${postId}/comments`, {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring'
      }
    })
    .then((response) => {
      dispatch(commentListAction(response.data));
    })
    .catch((error) => {
      dispatch(commentErrorAction(error.message));
    });
  };
}

export const voteComment = (commentId, voteOption) => {
  return (dispatch) => {
    dispatch(commentFetchAction());

    axios.post(`${Config.serverURL}/comments/${commentId}`, JSON.stringify(voteOption), {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring',
        'content-type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(commentVoteAction(response.data));
    })
    .catch((error) => {
      dispatch(commentErrorAction(error.message));
    });
  };
};

export const createComment = (commentItem) => {
  return (dispatch) => {
    dispatch(commentFetchAction());

    axios.post(`${Config.serverURL}/comments`, JSON.stringify(commentItem), {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring',
        'content-type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(commentCreateAction(response.data));
    })
    .catch((error) => {
      dispatch(commentErrorAction(error.message));
    });
  };
};

export const updateComment = (commentId, commentItem) => {
  return (dispatch) => {
    dispatch(commentFetchAction());

    axios.put(`${Config.serverURL}/comments/${commentId}`, JSON.stringify(commentItem), {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring',
        'content-type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(commentUpdateAction(response.data));
    })
    .catch((error) => {
      dispatch(commentErrorAction(error.message));
    });
  };
};

export const deleteComment = (commentId) => {
  return (dispatch) => {
    dispatch(commentFetchAction());

    axios.delete(`${Config.serverURL}/comments/${commentId}`, {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring',
        'content-type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(commentDeleteAction(response.data));
    })
    .catch((error) => {
      dispatch(commentErrorAction(error.message));
    });
  };
};
