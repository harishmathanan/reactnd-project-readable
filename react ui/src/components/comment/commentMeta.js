import React from 'react';
import PropTypes from 'prop-types';
import FaTrash from 'react-icons/lib/fa/trash';
import FaPencil from 'react-icons/lib/fa/pencil';
import { dateFormatter } from '../../common/helpers';

const CommentMeta = (props) => {
  return (
    <div className="comment-meta">
      submitted on {dateFormatter(props.timestamp)} by {props.author}

      <span style={{ textAlign: 'right', float: 'right' }}>
        <FaPencil
          className="meta-icon"
          onClick={props.editHandler}
        />

        <FaTrash
          className="meta-icon"
          onClick={props.deleteHandler}
        />
      </span>
    </div>
  );
};

CommentMeta.propTypes = {
  timestamp: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func
};

export default CommentMeta;
