import React from 'react';
import PropTypes from 'prop-types';
import ErrorStatus from '../shared/errorStatus';
import ProgressStatus from '../shared/progressStatus';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateRandom } from '../../common/helpers';
import { getCategoryList } from '../../actions/categoryActions';
import {
  getPostItem, createPostItem,
  updatePostItem, deletePostItem
} from '../../actions/postActions';


class FormPage extends React.Component {
  constructor() {
    super();

    this.onCreate = this.onCreate.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  render() {
    if (this.props.isFetching) {
      return <ProgressStatus />;
    }

    if (this.props.isError) {
      return <ErrorStatus message={this.props.message} />;
    }

    if (this.props.post) {
      return (
        <div className="wrapper top">
          <div className="actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onEdit}>
              Save
            </button>
            &nbsp;
            <NavLink
              to={'/'}
              className="btn btn-secondary">
              Cancel
            </NavLink>
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

    return (
      <div className="wrapper top">
        <div className="actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onCreate}>
            Save
          </button>

          <NavLink
            to={'/'}
            className="lnk lnk-secondary">
            Cancel
          </NavLink>
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
      </div>
    );
  }

  componentDidMount() {
    // check route path, and if post id
    // is provided then the post is for editing
    if (this.props.match.params.id) {

      const postId = this.props.match.params.id;
      this.props.getPost(postId);

    } else {

      this.props.getCategories();
    }
  }

  onCreate(e) {
    e.preventDefault();

    const postItem = {
      id: generateRandom(),
      title: document.getElementById('title').value.trim(),
      body: document.getElementById('body').value.trim(),
      category: document.getElementById('category').value,
      timestamp: Date.now(),
      author: 'Harish Mathanan'
    };

    this.props.createPost(postItem);
    this.props.history.push('/');
  }

  onEdit(e) {
    e.preventDefault();

    const postId = this.props.post.id;
    const postItem = {
      title: document.getElementById('title').value.trim(),
      body: document.getElementById('body').value.trim()
    };

    this.props.updatePost(postId, postItem);
    this.props.history.push('/');
  }

  onDelete(e) {
    e.preventDefault();

    const mockId = 'fadf96321sakhg';
    this.props.deletePost(mockId);
    this.props.history.push('/');
  }
}

FormPage.propTypes = {
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
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
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
    categories: state.category.categoryList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: bindActionCreators(getPostItem, dispatch),
    createPost: bindActionCreators(createPostItem, dispatch),
    updatePost: bindActionCreators(updatePostItem, dispatch),
    deletePost: bindActionCreators(deletePostItem, dispatch),
    getCategories: bindActionCreators(getCategoryList, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(FormPage);

