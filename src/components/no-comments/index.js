import React from 'react';
import CommentsForm from '../../containers/comments-form';
import { Link, useLocation } from 'react-router-dom';

const NoComments = ({ articleId, exists }) => {
  const location = useLocation();

  return (
    <div style={{ margin: '30px 40px 0 10px' }}>
      <h3 style={{ marginLeft: '30px' }}>Комментарии (0)</h3>
      {exists ? (
        <CommentsForm parentId={articleId} />
      ) : (
        <p className="comment-warn">
          <Link
            to="/login"
            state={{ back: location.pathname + location.search + location.hash }}
          >
            Войдите
          </Link>
          , чтобы иметь возможность ответить.
        </p>
      )}
    </div>
  );
};

export default NoComments;
