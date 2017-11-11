import React from 'react';
import PropTypes from 'prop-types';
import { dateFormatter } from '../../common/helpers';

const CommentMeta = (props) => {
  return (
    <div className="comment-meta">
      submitted on {dateFormatter(props.timestamp)} by {props.author}
    </div>
  );
};

CommentMeta.propTypes = {
  timestamp: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired
};

export default CommentMeta;
