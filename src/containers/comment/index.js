import React from 'react';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import { useSelector as useReduxSelector } from 'react-redux';
import reviewsActions from '../../store-redux/reviews/actions';
import CommentView from '../../components/comment-view';

const CommentContainer = ({ comment, onReply, level = 0 }) => {
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
    userId: state.session.user?.['_id'] || null,
  }));

  const replyTo = useReduxSelector(state => state.reviews.replyTo);
  const isReplying = replyTo === comment._id;
  const isCurrentUser = comment.author?.['_id'] === select.userId;
  const handleCancel = () => {
    dispatch(reviewsActions.clearReplyTo());
  };

  const renderReply = (reply, newLevel) => (
    <CommentContainer key={reply._id} comment={reply} onReply={onReply} level={newLevel} />
  );

  return (
    <div>
    <CommentView
      comment={comment}
      onReply={onReply}
      level={level}
      isCurrentUser={isCurrentUser}
      isReplying={isReplying}
      exists={select.exists}
      handleCancel={handleCancel}
      renderReply={renderReply}
    />
    </div>
  );
};

export default React.memo(CommentContainer);
