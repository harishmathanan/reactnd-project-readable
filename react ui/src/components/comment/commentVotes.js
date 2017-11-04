import React from 'react';
import PropTypes from 'prop-types';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';

const CommentVotes = (props) => {
  return (
    <div className="comment-votes">
      votes {props.voteScore}
      &nbsp;

    <FaThumbsUp
        className="comment-vote-icon vote-up"
        onClick={() => props.voteHandler(props.id, { option: 'upVote' })}
      />

      <FaThumbsDown
        className="post-vote-icon vote-down"
        onClick={() => props.voteHandler(props.id, { option: 'downVote' })}
      />
    </div>
  );
};

CommentVotes.propTypes = {
  id: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  voteHandler: PropTypes.func.isRequired
};

export default CommentVotes;
