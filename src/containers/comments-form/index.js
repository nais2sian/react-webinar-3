import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import reviewsActions from '../../store-redux/reviews/actions';
import CommentsFormView from '../../components/comments-form-view';
import useSelector from '../../hooks/use-selector';

const CommentsForm = ({ parentId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { id: articleId } = useParams();
  const targetId = parentId || articleId;
  const isNewComment = parentId === articleId;
  const formTitle = isNewComment ? 'Новый комментарий' : 'Новый ответ';
  const select = useSelector(state => ({
    name: state.session.user?.profile?.name || '',
  }));


  const handleSubmit = e => {
    e.preventDefault();

    console.log('Форма отправлена');
    const targetType = targetId === articleId ? 'article' : 'comment';
    dispatch(reviewsActions.addNewComment(targetId, text, targetType, select.name));
    setText('');
    dispatch(reviewsActions.clearReplyTo());
  };

  const handleCancel = () => {
    dispatch(reviewsActions.clearReplyTo());
  };

  return (
    <CommentsFormView
      formTitle={formTitle}
      text={text}
      onChangeText={setText}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isNewComment={isNewComment}
    />
  );
};

export default CommentsForm;
