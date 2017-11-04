import React from 'react';
import PropTypes from 'prop-types';
import { dateFormatter } from '../../common/helpers';

const PostMeta = (props) => {
  return (
    <div className="post-meta">
      submitted on {dateFormatter(props.timestamp)} by {props.author} in {props.category}
    </div>
  );
};

PostMeta.propTypes = {
  timestamp: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default PostMeta;
