import { memo } from 'react';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import { useSelector as useReduxSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import reviewsActions from '../../store-redux/reviews/actions';
import { buildCommentsTree } from '../../utils/comments-to-tree';
import CommentsForm from '../../containers/comments-form';
import CommentsList from '../../components/comments-list';
import NoComments from '../../components/no-comments';
import Spinner from '../../components/spinner';

function Reviews() {
  const dispatch = useDispatch();
  const { id: articleId } = useParams();
  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  useInit(() => {
    dispatch(reviewsActions.load(articleId));
  }, [articleId]);

  const { reviews, waiting, replyTo } = useReduxSelector(state => ({
    reviews: state.reviews.data || [],
    waiting: state.reviews.waiting,
    replyTo: state.reviews.replyTo,
  }));

  const commentsArray = reviews || [];
  const commentsTree = buildCommentsTree(commentsArray);
  const handleReply = commentId => {
    dispatch(reviewsActions.setReplyTo(commentId));
  };

  if (waiting) {
    return <Spinner />;
  }

  if (commentsArray.length === 0) {
    return <NoComments articleId={articleId} exists={select.exists} />;
  }
  return (
    <div style={{ marginLeft: '10px', marginRight: '40px' }}>
      <CommentsList
        commentsTree={commentsTree}
        replyTo={replyTo}
        onReply={handleReply}
        totalComments={commentsArray.length}
      />
      {!replyTo && select.exists && <CommentsForm parentId={articleId} />}
      {!replyTo && !select.exists && (
        <p className="comment-warn">
          <a href="/login" style={{ marginLeft: '30px' }}>
            Войдите,
          </a>{' '}
          чтобы иметь возможность комментировать
        </p>
      )}
    </div>
  );
}
export default memo(Reviews);
