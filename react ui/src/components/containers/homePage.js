import React from 'react';
import PropTypes from 'prop-types';
import PostDisplay from '../post/postDisplay';
import ErrorStatus from '../shared/errorStatus';
import ProgressStatus from '../shared/progressStatus';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostList, votePostItem } from '../../actions/postActions';

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      sortBy: 'voteScore', // either 'voteScore' or 'timestamp'
      posts: []
    };

    this.onPostVote = this.onPostVote.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.sortByDescending = this.sortByDescending.bind(this);
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

          <NavLink
            to={'/post/create'}
            className="lnk lnk-primary">
            Create
          </NavLink>
        </div>

        {this.state.posts.map((post) => {
          return (
            <PostDisplay
              key={post.id}
              post={post}
              voteHandler={this.onPostVote}
            />
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    // this line is important, it is used
    // to let the component know that an action
    // from a different route has already been dispatched.
    if (this.props.isFetching) { return; }

    this.props.getPosts();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.posts) { return; }

    const sortedPosts = this.sortByDescending(newProps.posts, this.state.sortBy);
    this.setState({ posts: sortedPosts });
  }

  onPostVote(postId, voteValue) {
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
}

HomePage.propTypes = {
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  message: PropTypes.string,
  posts: PropTypes.array,
  getPosts: PropTypes.func,
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
    getPosts: bindActionCreators(getPostList, dispatch),
    votePost: bindActionCreators(votePostItem, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
