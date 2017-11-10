import React from 'react';
import PropTypes from 'prop-types';

const PostContent = (props) => {
  if (props.isSummary) {
    return (
      <div className="post-content">
        {props.body.length > 120
          ? props.body.substring(0, 120)
          : props.body
        }
        ...<a href={`/${props.id}`}>read more</a>
      </div>
    );
  }

  return (
    <div className="post-content">
      {props.body}
    </div>
  );
};

PostContent.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  isSummary: PropTypes.bool.isRequired
};

export default PostContent;
