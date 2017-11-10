import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = (props) => {
  // comment delete form
  if (props.mode === 'delete') {
    return (
      <div className="modal-content">
        <div className="actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => props.deleteHandler(props.comment.id)}>
            Delete
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.cancelHandler}>
            Cancel
          </button>
        </div>

        <div className="comment">
          <div className="comment-content">
            Are you sure you want to delete this comment?
            <p>"{props.comment.body}"</p>
          </div>
        </div>
      </div>
    );
  }

  // comment edit form
  if (props.mode === 'update') {
    return (
      <div className="modal-content">
        <div className="actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => props.updateHandler(props.comment.id)}>
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
        <label htmlFor="comment">Comment</label>
        <textarea
          cols={36}
          rows={9}
          className="control"
          id="comment"
          defaultValue={props.comment.body}
        />
      </div>
      </div>
    );
  }

  // comment create form
  return (
    <div className="modal-content">
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
        <label htmlFor="comment">Comment</label>
        <textarea
          cols={36}
          rows={9}
          className="control"
          id="comment"
        />
      </div>

      <div className="control-group">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          className="control"
          id="author"
        />
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  mode: PropTypes.string.isRequired, // either 'create', 'edit' or 'delete'
  comment: PropTypes.object,
  createHandler: PropTypes.func,
  updateHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  cancelHandler: PropTypes.func
}

export default CommentForm;
