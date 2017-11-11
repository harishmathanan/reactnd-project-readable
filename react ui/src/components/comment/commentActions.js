import React from 'react';
import PropTypes from 'prop-types';
import FaTrash from 'react-icons/lib/fa/trash';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';

const CommentActions = (props) => {
  const comment = props.comment;

  return (
    <div className="comment-actions">
      <span>
        votes {comment.voteScore}
        &nbsp;
        <FaThumbsUp
          className="voteUp-icon"
          onClick={() => props.voteHandler(comment.id, 'upVote')}
        />
        <FaThumbsDown
          className="voteDown-icon"
          onClick={() => props.voteHandler(comment.id, 'downVote')}
        />
      </span>

      <span className="right">
        <FaPencil
          className="edit-icon"
          onClick={() => props.toggleUpdate(comment)}
        />
        <FaTrash
          className="delete-icon"
          onClick={() => props.toggleDelete(comment)}
        />
      </span>
    </div>
  );
};

CommentActions.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    parentDeleted: PropTypes.bool.isRequired
  }).isRequired,
  voteHandler: PropTypes.func.isRequired,
  toggleUpdate: PropTypes.func.isRequired,
  toggleDelete: PropTypes.func.isRequired
};

export default CommentActions;
