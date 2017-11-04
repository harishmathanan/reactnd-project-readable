import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = (props) => {
  return (
    <div>
      <div className="actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.createHandler}>
          Save
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={props.cancelHandler}>
          Cancel
        </button>
      </div>

      <div className="control-group">
        <label htmlFor="commentCreate">Comment</label>
        <textarea
          cols={36}
          rows={9}
          className="control"
          id="commentCreate"
        />
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  createHandler: PropTypes.func,
  cancelHandler: PropTypes.func
}

export default CommentForm;
