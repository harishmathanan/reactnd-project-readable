import React from 'react';
import PropTypes from 'prop-types';
import PostDisplay from '../post/postDisplay';
import ErrorStatus from '../shared/errorStatus';
import ProgressStatus from '../shared/progressStatus';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostsByCategory, votePost } from '../../actions/postActions';

class CategoryPage extends React.Component {
  constructor() {
    super();

    this.state = {
      sortBy: 'voteScore', // either 'voteScore' or 'timestamp'
      posts: []
    };

    this.onVoteClick = this.onVoteClick.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.sortByDescending = this.sortByDescending.bind(this);
  }

  componentDidMount() {
    const category = this.props.match.params.category;
    this.props.getPostsByCategory(category);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.posts) { return; }

    const sortedPosts = this.sortByDescending(newProps.posts, this.state.sortBy);
    this.setState({ posts: sortedPosts });
  }

  onVoteClick(postId, voteValue) {
    const voteOption = { option: voteValue };
    this.props.votePost(postId, voteOption);
  }

  onSortChange(e) {
    e.preventDefault();

    const sortValue = e.target.value;
    const sortedPosts = this.sortByDescending(this.state.posts, sortValue);

    this.setState({ posts: sortedPosts, sortBy: sortValue });
  }

  sortByDescending(array, propertyName) {
    return array.sort((x, y) => {
      return y[propertyName] - x[propertyName];
    });
  }

  render() {
    if (this.props.isFetching) {
      return <ProgressStatus />;
    }

    if (this.props.isError) {
      return <ErrorStatus message={this.props.message} />;
    }

    return (
      <div className="wrapper top">

        <div className="actions">
          <label htmlFor="sort">Sort By</label>
          &nbsp;
            <select id="sort" name="sort" onChange={this.onSortChange}>
            <option value="voteScore">vote</option>
            <option value="timestamp">date</option>
          </select>
          &nbsp;
            <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.props.history.push('/post/create')}>
            Create
            </button>
        </div>

        {this.state.posts.map((post) => {
          return (
            <PostDisplay
              key={post.id}
              post={post}
              voteHandler={this.onVoteClick}
            />
          );
        })}
      </div>
    );
  }
}

CategoryPage.propTypes = {
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  message: PropTypes.string,
  posts: PropTypes.array,
  getPostsByCategory: PropTypes.func,
  votePost: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.post.isFetching,
    isError: state.post.isError,
    message: state.post.message,
    posts: state.post.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostsByCategory: bindActionCreators(getPostsByCategory, dispatch),
    votePost: bindActionCreators(votePost, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
