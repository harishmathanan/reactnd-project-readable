import React from 'react';
import PropTypes from 'prop-types';
import CommentMeta from './commentMeta';
import CommentVotes from './commentVotes';
import CommentContent from './commentContent';

class CommentDisplay extends React.Component {
  state = {
    isEdit: false
  };

  toggleEdit = () => {
    this.state.isEdit
      ? this.setState({ isEdit: false })
      : this.setState({ isEdit: true });
  };

  updateComment = (e) => {
    e.preventDefault();

    const commentId = this.props.comment.id;
    const commentItem = {
      body: document.getElementById('commentEdit').value.trim(),
      timestamp: Date.now()
    }

    this.props.updateHandler(commentId, commentItem);
  };

  deleteComment = (e) => {
    e.preventDefault();

    const commentId = this.props.comment.id;
    this.props.deleteHandler(commentId);
  };

  render() {
    const comment = this.props.comment;

    if (this.state.isEdit) {
      return (
        <div>
          <div className="actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.updateComment}>
              Save
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.toggleEdit}>
              Cancel
            </button>
          </div>

          <div className="comment">
            <div className="control-group">
              <label htmlFor="commentEdit">Comment</label>
              <textarea
                cols={36}
                rows={9}
                className="control"
                id="commentEdit"
                defaultValue={comment.body}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="comment">
        <CommentMeta
          timestamp={comment.timestamp}
          author={comment.author}
          editHandler={this.toggleEdit}
          deleteHandler={this.deleteComment}
        />

        <CommentVotes
          id={comment.id}
          voteScore={comment.voteScore}
          voteHandler={this.props.voteHandler}
        />

        <CommentContent
          body={comment.body}
        />
      </div>
    );
  }
}

CommentDisplay.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    parentDeleted: PropTypes.bool.isRequired
  }).isRequired,
  voteHandler: PropTypes.func,
  updateHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  cancelHandler: PropTypes.func
};

export default CommentDisplay;
