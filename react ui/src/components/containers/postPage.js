import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import PostDetail from '../post/postDetail';
import Comment from '../comment/comment';
import CommentForm from '../comment/commentForm';
import ErrorStatus from '../shared/errorStatus';
import ProgressStatus from '../shared/progressStatus';
import FaComments from 'react-icons/lib/fa/comments';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateRandom } from '../../common/helpers';
import { getPost, votePost } from '../../actions/postActions';
import {
  getAllComments,
  voteComment,
  createComment,
  updateComment,
  deleteComment
} from '../../actions/commentActions';


class PostPage extends React.Component {
  constructor() {
    super();

    this.state = {
      isCreate: false,
      isUpdate: false,
      isDelete: false,
      comment: {}
    };

    this.onPostVoteClick = this.onPostVoteClick.bind(this);
    this.onPostCancelClick = this.onPostCancelClick.bind(this);

    this.onCommentVoteClick = this.onCommentVoteClick.bind(this);
    this.onCommentCreateClick = this.onCommentCreateClick.bind(this);
    this.onCommentUpdateClick = this.onCommentUpdateClick.bind(this);
    this.onCommentDeleteClick = this.onCommentDeleteClick.bind(this);
    this.onCommentCancelClick = this.onCommentCancelClick.bind(this);

    this.toggleCommentCreate = this.toggleCommentCreate.bind(this);
    this.toggleCommentUpdate = this.toggleCommentUpdate.bind(this);
    this.toggleCommentDelete = this.toggleCommentDelete.bind(this);
  }

  componentDidMount() {
    const postId = this.props.match.params.id;

    this.props.getPost(postId);
    this.props.getComments(postId);

  }

  toggleCommentCreate() {
    this.state.isCreate
    ? this.setState({ isCreate: false })
    : this.setState({ isCreate: true });
  }

  toggleCommentUpdate(commentItem) {
    this.state.isUpdate
    ? this.setState({ isUpdate: false, comment: {} })
    : this.setState({ isUpdate: true, comment: commentItem });
  }

  toggleCommentDelete(commentItem) {
    this.state.isDelete
    ? this.setState({ isDelete: false, comment: {} })
    : this.setState({ isDelete: true, comment: commentItem });
  }

  onPostVoteClick(postId, voteValue) {
    const voteOption = { option: voteValue };
    this.props.votePost(postId, voteOption);
  }

  onPostCancelClick() {
    this.props.history.goBack();
  }

  onCommentVoteClick(commentId, voteValue) {
    const voteOption = { option: voteValue };
    this.props.voteComment(commentId, voteOption);
  }

  onCommentCreateClick() {
    const postId = this.props.match.params.id;

    const commentItem = {
      id: generateRandom(),
      body: document.getElementById('comment').value.trim(),
      author: document.getElementById('author').value.trim(),
      timestamp: Date.now(),
      parentId: postId
    };

    this.props.createComment(commentItem);
    this.toggleCommentCreate();
  }

  onCommentUpdateClick(commentId) {
    const commentItem = {
      body: document.getElementById('comment').value.trim(),
      timestamp: Date.now()
    };

    this.props.updateComment(commentId, commentItem);
    this.toggleCommentUpdate();
  }

  onCommentDeleteClick(commentId) {
    this.props.deleteComment(commentId);
    this.toggleCommentDelete();
  }

  onCommentCancelClick() {
    if (this.state.isCreate) {
      this.toggleCommentCreate();
    }

    if (this.state.isUpdate) {
      this.toggleCommentUpdate();
    }

    if (this.state.isDelete) {
      this.toggleCommentDelete();
    }
  }

  render() {
    if (this.props.isFetching || Object.keys(this.props.post).length === 0) {
      return <ProgressStatus />;
    }

    if (this.props.isError) {
      return <ErrorStatus message={this.props.message} />;
    }

    return (
      <div className="wrapper top">

        <Modal isOpen={this.state.isCreate}>
          <CommentForm
            mode="create"
            createHandler={this.onCommentCreateClick}
            cancelHandler={this.onCommentCancelClick}
          />
        </Modal>

        <Modal isOpen={this.state.isUpdate}>
          <CommentForm
            mode="update"
            comment={this.state.comment}
            updateHandler={this.onCommentUpdateClick}
            cancelHandler={this.onCommentCancelClick}
          />
        </Modal>

        <Modal isOpen={this.state.isDelete}>
          <CommentForm
            mode="delete"
            comment={this.state.comment}
            deleteHandler={this.onCommentDeleteClick}
            cancelHandler={this.onCommentCancelClick}
          />
        </Modal>

        <div className="actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.onPostCancelClick}>
            Cancel
          </button>
        </div>

        <PostDetail
          post={this.props.post}
          voteHandler={this.onPostVoteClick}
        />

        <div className="comment-section">
          <div className="actions">
            <h3>
              <FaComments />
              &nbsp;
              ({this.props.post.commentCount}) comments
            </h3>

            &nbsp;
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.toggleCommentCreate}>
              Add
            </button>
          </div>

          {this.props.comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                voteHandler={this.onCommentVoteClick}
                toggleUpdate={this.toggleCommentUpdate}
                toggleDelete={this.toggleCommentDelete}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

PostPage.propTypes = {
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  message: PropTypes.string,
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.number,
    author: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    commentCount: PropTypes.number,
    deleted: PropTypes.bool
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      parentId: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired,
      parentDeleted: PropTypes.bool.isRequired
    })
  ),
  getPost: PropTypes.func,
  votePost: PropTypes.func,
  getComments: PropTypes.func,
  voteComment: PropTypes.func,
  createComment: PropTypes.func,
  updateComment: PropTypes.func,
  deleteComment: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.post.isFetching || state.comment.isFetching,
    isError: state.post.isError || state.comment.isError,
    message: state.post.message || state.comment.message,
    post: state.post.post,
    comments: state.comment.comments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: bindActionCreators(getPost, dispatch),
    votePost: bindActionCreators(votePost, dispatch),
    getComments: bindActionCreators(getAllComments, dispatch),
    voteComment: bindActionCreators(voteComment, dispatch),
    createComment: bindActionCreators(createComment, dispatch),
    updateComment: bindActionCreators(updateComment, dispatch),
    deleteComment: bindActionCreators(deleteComment, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
