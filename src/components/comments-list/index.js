import React from 'react';
import Comment from '../comment';

const CommentsList = ({ commentsTree, replyTo, onReply, totalComments }) => (
  <>
    {commentsTree.map((comment, index) => (
      <Comment
        key={comment._id}
        comment={comment}
        onReply={onReply}
        isReplying={replyTo === comment._id}
        commentsCount={index === 0 ? totalComments : null}
      />
    ))}
  </>
);

export default CommentsList;
