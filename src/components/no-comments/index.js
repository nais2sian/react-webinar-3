import React from 'react';
import CommentsForm from '../../containers/comments-form';

const NoComments = ({ articleId, exists }) => (
  <div style={{ margin: '30px 40px 0 10px' }}>
    <h3 style={{ marginLeft: '30px' }}>Комментарии (0)</h3>
    {exists ? (
      <CommentsForm parentId={articleId} />
    ) : (
      <p className="comment-warn">
        <a href="/login" style={{ marginLeft: '30px' }}>Войдите,</a> чтобы иметь возможность комментировать
      </p>
    )}
  </div>
);

export default NoComments;
