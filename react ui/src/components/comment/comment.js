import React from 'react';
import PropTypes from 'prop-types';
import CommentMeta from './commentMeta';
import CommentContent from './commentContent';
import CommentActions from './commentActions';

const Comment = (props) => {
  const comment = props.comment;

  return (
    <div className="comment">
      <CommentMeta
        timestamp={comment.timestamp}
        author={comment.author}
      />

      <CommentActions
        comment={comment}
        voteHandler={props.voteHandler}
        toggleUpdate={props.toggleUpdate}
        toggleDelete={props.toggleDelete}
      />

      <CommentContent
        body={comment.body}
      />
    </div>
  );
};

Comment.propTypes = {
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

export default Comment;
