import { memo } from 'react';
import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import { useSelector as useReduxSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import reviewsActions from '../../store-redux/reviews/actions';
import listToTree from '../../utils/list-to-tree';
import CommentsForm from '../../containers/comments-form';
import CommentContainer from '../../containers/comment';
import NoComments from '../../components/no-comments';
import Spinner from '../../components/spinner';

function Reviews() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id: articleId } = useParams();
  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  useInit(() => {
    dispatch(reviewsActions.load(articleId));
  }, []);

  const { reviews, waiting, replyTo } = useReduxSelector(state => ({
    reviews: state.reviews.data || [],
    waiting: state.reviews.waiting,
    replyTo: state.reviews.replyTo,
  }));

  const commentsArray = reviews || [];
  const commentsTree = listToTree(commentsArray, '_id');

  const handleReply = commentId => {
    dispatch(reviewsActions.setReplyTo(commentId));
  };

  if (waiting) {
    return <Spinner />;
  }

  if (commentsArray.length === 0) {
    return <NoComments articleId={articleId} exists={select.exists} />;
  }

  const totalComments=commentsArray.length

  return (
    <div style={{ marginLeft: '10px', marginRight: '40px' }}>
      {totalComments && <h3 style={{ margin: '30px 0 25px 30px'}}>Комментарии ({totalComments})</h3>}
      {commentsTree.map(comment => (
        <CommentContainer key={comment._id} comment={comment} onReply={handleReply} level={0}/>
      ))}

      <div>{!replyTo && select.exists && <CommentsForm parentId={articleId} />}</div>
      {!replyTo && !select.exists && (
        <p style={{ marginLeft: '30px' }}>
          <Link
            to="/login"
            className="comment-warn"
            state={{ back: location.pathname + location.search }}
          >
            Войдите
          </Link>
          , чтобы иметь возможность комментировать
        </p>
      )}
    </div>
  );
}
export default memo(Reviews);
