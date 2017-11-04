import React from 'react';
import PropTypes from 'prop-types';
import PostDetail from '../post/postDetail';
import ErrorStatus from '../shared/errorStatus';
import ProgressStatus from '../shared/progressStatus';
import CommentForm from '../comment/commentForm';
import CommentDisplay from '../comment/commentDisplay';
import FaComments from 'react-icons/lib/fa/comments';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateRandom } from '../../common/helpers';
import {
  getPostItem,
  votePostItem,
  deletePostItem
} from '../../actions/postActions';
import {
  getCommentList,
  voteCommentItem,
  createCommentItem,
  updateCommentItem,
  deleteCommentItem
} from '../../actions/commentActions';

class PostPage extends React.Component {
  constructor() {
    super();

    this.state = {
      isAddComment: false
    };

    this.onPostVote = this.onPostVote.bind(this);
    this.onPostEdit = this.onPostEdit.bind(this);
    this.onPostDelete = this.onPostDelete.bind(this);

    this.onCommentCreate = this.onCommentCreate.bind(this);
    this.toggleAddComment = this.toggleAddComment.bind(this);
  }

  render() {
    if (this.props.isFetching || !this.props.post) {
      return <ProgressStatus />;
    }

    if (this.props.isError) {
      return <ErrorStatus message={this.props.message} />;
    }

    return (
      <div className="wrapper top">
        <div className="actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onPostEdit}>
            Edit
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.onPostDelete}>
            Delete
          </button>
        </div>

        <PostDetail
          post={this.props.post}
          voteHandler={this.onPostVote}
        />

        <div>
          <div className="actions">
            <h3><FaComments /> ({this.props.post.commentCount}) comments</h3>

            <button
              type="button"
              className="btn btn-primary"
              onClick={this.toggleAddComment}>
              Add
            </button>
          </div>

          {this.state.isAddComment &&
            <CommentForm
              createHandler={this.onCommentCreate}
              cancelHandler={this.toggleAddComment}
            />
          }

          {this.props.comments.map((comment) => {
            return (
              <CommentDisplay
                key={comment.id}
                comment={comment}
                voteHandler={this.props.voteComment}
                updateHandler={this.props.updateComment}
                deleteHandler={this.props.deleteComment}
              />
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getPost(postId);
    this.props.getComments(postId);
  }

  onPostVote(postId, voteValue) {
    const voteOption = { option: voteValue };
    this.props.votePost(postId, voteOption);
  }

  onPostDelete(e) {
    e.preventDefault();

    const postId = this.props.post.id;
    this.props.deletePost(postId);
    this.props.history.push('/');
  }

  onPostEdit(e) {
    e.preventDefault();

    const postId = this.props.post.id
    this.props.history.push('/post/edit/' + postId);
  }

  onCommentCreate(e) {
    e.preventDefault();

    let commentItem = {
      id: generateRandom(),
      body: document.getElementById('commentCreate').value.trim(),
      timestamp: Date.now(),
      author: 'Harish Mathanan', // hard-coded value
      parentId: this.props.post.id
    };

    this.props.createComment(commentItem);
    this.toggleAddComment();
  }

  toggleAddComment() {
    //e.preventDefault();

    this.state.isAddComment
      ? this.setState({ isAddComment: false })
      : this.setState({ isAddComment: true });
  }
}

PostPage.propTypes = {
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  message: PropTypes.string,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      parentId: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired,
      parentDeleted: PropTypes.bool.isRequired
    })
  ),
  getPost: PropTypes.func,
  votePost: PropTypes.func,
  deletePost: PropTypes.func,
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
    getPost: bindActionCreators(getPostItem, dispatch),
    votePost: bindActionCreators(votePostItem, dispatch),
    deletePost: bindActionCreators(deletePostItem, dispatch),
    getComments: bindActionCreators(getCommentList, dispatch),
    voteComment: bindActionCreators(voteCommentItem, dispatch),
    createComment: bindActionCreators(createCommentItem, dispatch),
    updateComment: bindActionCreators(updateCommentItem, dispatch),
    deleteComment: bindActionCreators(deleteCommentItem, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
