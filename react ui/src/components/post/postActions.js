import React from 'react';
import PropTypes from 'prop-types';
import FaTrash from 'react-icons/lib/fa/trash';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';
import { NavLink } from 'react-router-dom';

const PostActions = (props) => {
  return (
    <div className="post-actions">
      <span>
        votes {props.votes}
        &nbsp;
        <FaThumbsUp
          className="voteUp-icon"
          onClick={() => props.voteHandler(props.id, 'upVote')}
        />
        <FaThumbsDown
          className="voteDown-icon"
          onClick={() => props.voteHandler(props.id, 'downVote')}
        />
      </span>

      <span className="right">
        <NavLink to={`/edit/${props.id}`}>
          <FaPencil className="edit-icon" />
        </NavLink>

        <NavLink to={`/delete/${props.id}`}>
          <FaTrash className="delete-icon" />
        </NavLink>
      </span>
    </div>
  );
};

PostActions.propTypes = {
  id: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  voteHandler: PropTypes.func.isRequired
};

export default PostActions;
