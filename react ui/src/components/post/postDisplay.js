import React from 'react';
import PropTypes from 'prop-types';
import PostMeta from './postMeta';
import PostVotes from './postVotes';
import PostHeader from './postHeader';
import PostContent from './postContent';

const PostDisplay = (props) => {
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

      <PostVotes
        id={props.post.id}
        voteScore={props.post.voteScore}
        voteHandler={props.voteHandler}
      />

      <PostContent
        isSummary={true}
        id={props.post.id}
        body={props.post.body}
      />
    </div>
  );
};

PostDisplay.propTypes = {
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

export default PostDisplay;
