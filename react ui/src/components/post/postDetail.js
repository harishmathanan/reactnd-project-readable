import React from 'react';
import PropTypes from 'prop-types';
import PostMeta from './postMeta';
import PostHeader from './postHeader';
import PostContent from './postContent';
import PostActions from './postActions';

const PostDetail = (props) => {
  const post = props.post;

  return (
    <div className="post">
      <PostHeader
        id={post.id}
        title={post.title}
        category={post.category}
      />

      <PostMeta
        timestamp={post.timestamp}
        author={post.author}
        category={post.category}
      />

      <PostActions
        id={post.id}
        votes={post.voteScore}
        voteHandler={props.voteHandler}
      />

      <PostContent
        isSummary={false}
        id={post.id}
        body={post.body}
      />
    </div>
  );
};

PostDetail.propTypes = {
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
  }).isRequired,
  voteHandler: PropTypes.func.isRequired
};

export default PostDetail;
