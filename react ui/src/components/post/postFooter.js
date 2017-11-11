import React from 'react';
import PropTypes from 'prop-types';
import FaComments from 'react-icons/lib/fa/comments';

const PostFooter = (props) => {
  return (
    <div className="post-footer">
      <FaComments />
      &nbsp;
      ({props.commentCount}) comments
    </div>
  );
};

PostFooter.propTypes = {
  commentCount: PropTypes.number.isRequired
};

export default PostFooter;
