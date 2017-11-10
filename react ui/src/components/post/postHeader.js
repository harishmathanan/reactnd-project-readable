import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const PostHeader = (props) => {
  return (
    <div className="post-header">
      <h3>
        <NavLink to={`/post/${props.id}`}>
          {props.title}
        </NavLink>
      </h3>
    </div>
  );
};

PostHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default PostHeader;
