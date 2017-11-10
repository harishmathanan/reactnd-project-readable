import React from 'react';
import PropTypes from 'prop-types';
import ErrorStatus from '../shared/errorStatus';
import ProgressStatus from '../shared/progressStatus';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateRandom } from '../../common/helpers';
import { getAllCategories } from '../../actions/categoryActions';
import {
  getPost,
  createPost,
  updatePost,
  deletePost
} from '../../actions/postActions';


class FormPage extends React.Component {
  constructor() {
    super();

    this.onCreateClick = this.onCreateClick.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      // edit or delete form
      const postId = this.props.match.params.id;
      this.props.getPost(postId);

    } else {
      // create form
      this.props.getCategories();
    }
  }

  onCreateClick() {
    const postItem = {
      id: generateRandom(),
      title: document.getElementById('title').value.trim(),
      body: document.getElementById('body').value.trim(),
      author: document.getElementById('author').value.trim(),
      category: document.getElementById('category').value,
      timestamp: Date.now()
    };

    this.props.createPost(postItem);
    this.props.history.push('/');
  }

  onUpdateClick() {
    const postId = this.props.match.params.id;
    const postItem = {
      title: document.getElementById('title').value.trim(),
      body: document.getElementById('body').value.trim()
    };

    this.props.updatePost(postId, postItem);
    this.props.history.push('/');
  }

  onDeleteClick() {
    const postId = this.props.match.params.id;

    this.props.deletePost(postId);
    this.props.history.push('/');
  }

  onCancelClick() {
    this.props.history.goBack();
  }

  render() {
    const routePath = this.props.location.pathname.toString();

    if (this.props.isFetching) {
      return <ProgressStatus />;
    }

    if (this.props.isError) {
      return <ErrorStatus message={this.props.message} />;
    }

    // delete route --> delete form
    if (routePath.indexOf('delete') !== -1) {
      return (
        <div className="wrapper top">
          <div className="actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onDeleteClick}>
              Delete
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.onCancelClick}>
              Cancel
          </button>
          </div>

          <div>
            Confirm <strong>delete</strong> "{this.props.post.title}"?
          </div>
        </div>
      );
    }

    // edit route --> edit form
    if (routePath.indexOf('edit') !== -1) {
      if (this.props.isFetching) {
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
              onClick={this.onUpdateClick}>
              Save
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.onCancelClick}>
              Cancel
          </button>
          </div>

          <div className="control-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="control"
              id="title"
              defaultValue={this.props.post.title}
            />
          </div>

          <div className="control-group">
            <label htmlFor="body">Body</label>
            <textarea
              cols={36}
              rows={9}
              className="control"
              id="body"
              defaultValue={this.props.post.body}
            />
          </div>
        </div>
      );
    }

    // create form
    return (
      <div className="wrapper top">
        <div className="actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onCreateClick}>
            Save
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.onCancelClick}>
            Cancel
        </button>
        </div>

        <div className="control-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="control"
            id="title"
          />
        </div>

        <div className="control-group">
          <label htmlFor="body">Body</label>
          <textarea
            cols={36}
            rows={9}
            className="control"
            id="body"
          />
        </div>

        <div className="control-group">
          <label htmlFor="category">Category</label>
          <select
            className="control"
            id="category">

            {this.props.categories &&
              this.props.categories.map((category) => {
                return (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                );
              })
            }

          </select>
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
}

FormPage.propTypes = {
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
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string
    })
  ),
  getPost: PropTypes.func,
  getCategories: PropTypes.func,
  createPost: PropTypes.func,
  updatePost: PropTypes.func,
  deletePost: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.post.isFetching || state.category.isFetching,
    isError: state.post.isError || state.category.isError,
    message: state.post.message || state.category.message,
    post: state.post.post,
    categories: state.category.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: bindActionCreators(getPost, dispatch),
    createPost: bindActionCreators(createPost, dispatch),
    updatePost: bindActionCreators(updatePost, dispatch),
    deletePost: bindActionCreators(deletePost, dispatch),
    getCategories: bindActionCreators(getAllCategories, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(FormPage);

