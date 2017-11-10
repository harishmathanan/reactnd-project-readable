import axios from 'axios';
import { Config } from '../common/config';
import {
  POST_FETCH,
  POST_ERROR,
  POST_LIST,
  POST_ITEM,
  POST_VOTE,
  POST_CREATE,
  POST_UPDATE,
  POST_DELETE
} from './types';


const postFetchAction = () => {
  return {
    type: POST_FETCH
  };
};

const postErrorAction = (error) => {
  return {
    type: POST_ERROR,
    error
  };
};

const postListAction = (data) => {
  return {
    type: POST_LIST,
    data
  };
};

const postItemAction = (data) => {
  return {
    type: POST_ITEM,
    data
  };
};

const postVoteAction = (data) => {
  return {
    type: POST_VOTE,
    data
  };
};

const postCreateAction = (data) => {
  return {
    type: POST_CREATE,
    data
  };
};

const postUpdateAction = (data) => {
  return {
    type: POST_UPDATE,
    data
  };
}

const postDeleteAction = (data) => {
  return {
    type: POST_DELETE,
    data
  };
};

export const getAllPosts = () => {
  return (dispatch) => {
    dispatch(postFetchAction());

    axios.get(`${Config.serverURL}/posts`, {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring'
      }
    })
    .then((response) => {
      dispatch(postListAction(response.data))
    })
    .catch((error) => {
      dispatch(postErrorAction(error.message))
    });
  };
};

export const getPostsByCategory = (category) => {
  return (dispatch) => {
    dispatch(postFetchAction());

    axios.get(`${Config.serverURL}/${category}/posts`, {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring'
      }
    })
    .then((response) => {
      dispatch(postListAction(response.data))
    })
    .catch((error) => {
      dispatch(postErrorAction(error.message))
    });
  };
};

export const getPost = (postId) => {
  return (dispatch) => {
    dispatch(postFetchAction());

    axios.get(`${Config.serverURL}/posts/${postId}`, {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring'
      }
    })
    .then((response) => {
      dispatch(postItemAction(response.data))
    })
    .catch((error) => {
      dispatch(postErrorAction(error.message))
    });
  };
}

export const votePost = (postId, voteOption) => {
  return (dispatch) => {
    dispatch(postFetchAction());

    axios.post(`${Config.serverURL}/posts/${postId}`, JSON.stringify(voteOption), {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring',
        'content-type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(postVoteAction(response.data));
    })
    .catch((error) => {
      dispatch(postErrorAction(error.message));
    });
  };
};

export const createPost = (postItem) => {
  return (dispatch) => {
    dispatch(postFetchAction());

    axios.post(`${Config.serverURL}/posts`, JSON.stringify(postItem), {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring',
        'content-type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(postCreateAction(response.data));
    })
    .catch((error) => {
      dispatch(postErrorAction(error.message));
    });
  };
};

export const updatePost = (postId, postItem) => {
  return (dispatch) => {
    dispatch(postFetchAction());

    axios.put(`${Config.serverURL}/posts/${postId}`, JSON.stringify(postItem), {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring',
        'content-type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(postUpdateAction(response.data));
    })
    .catch((error) => {
      dispatch(postErrorAction(error.message));
    });
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    dispatch(postFetchAction());

    axios.delete(`${Config.serverURL}/posts/${postId}`, {
      headers: {
        'accept': 'application/json',
        'authorization': 'randomstring',
        'content-type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(postDeleteAction(response.data));
    })
    .catch((error) => {
      dispatch(postErrorAction(error.message));
    });
  };
};
