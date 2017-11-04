import React from 'react';
import PropTypes from 'prop-types';

const CommentContent = (props) => {
  return (
    <div className="comment-content">
      {props.body}
    </div>
  );
};

CommentContent.propTypes = {
  body: PropTypes.string.isRequired
};

export default CommentContent;
