import React from 'react';
import PropTypes from 'prop-types';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';

const PostVotes = (props) => {
  return (
    <div className="post-votes bottom">
      votes {props.voteScore}
      &nbsp;

      <FaThumbsUp
        className="post-vote-icon vote-up"
        onClick={() => props.voteHandler(props.id, 'upVote')}
      />

      <FaThumbsDown
        className="post-vote-icon vote-down"
        onClick={() => props.voteHandler(props.id, 'downVote')}
      />
    </div>
  );
};

PostVotes.propTypes = {
  id: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  voteHandler: PropTypes.func.isRequired
};

export default PostVotes;
