import React from 'react';
import PropTypes from 'prop-types';
import PostMeta from './postMeta';
import PostHeader from './postHeader';
import PostContent from './postContent';
import PostActions from './postActions';

const PostDetail = (props) => {
  return (
    <div className="post">
      <PostHeader
        id={props.post.id}
        title={props.post.title}
      />

      <PostMeta
        timestamp={props.post.timestamp}
        author={props.post.author}
        category={props.post.category}
      />

      <PostActions
        id={props.post.id}
        votes={props.post.voteScore}
        voteHandler={props.voteHandler}
      />

      <PostContent
        isSummary={false}
        id={props.post.id}
        body={props.post.body}
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
  }),
  voteHandler: PropTypes.func.isRequired
};

export default PostDetail;
