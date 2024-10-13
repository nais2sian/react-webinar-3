import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentsForm from '../../containers/comments-form';
import './style.css';

const CommentView = ({
  comment,
  onReply,
  level = 0,
  isCurrentUser,
  isReplying,
  exists,
  handleCancel,
  renderReply,
}) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (isReplying && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isReplying]);

  const baseIndent = 30;
  const nullIndent = 0;
  const maxLevel = 25;
  const indent = level > maxLevel ? nullIndent : baseIndent;

  const authorClassName = isCurrentUser
    ? 'comment-author comment-author--current'
    : 'comment-author';

  return (
    <div className="comment" style={{ marginLeft: `${indent}px` }}>
      <div className="comment-item" style={{ marginBottom: '30px' }}>
        <strong className={authorClassName}>{comment.author?.profile?.name || 'Аноним'}</strong>{' '}
        <span className="comment-date">
          {new Date(comment.dateCreate).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}{' '}
          в{' '}
          {new Date(comment.dateCreate).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        <p className="comment-text">{comment.text}</p>
        <button onClick={() => onReply(comment._id)} className="reply-button">
          Ответить
        </button>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map(reply => renderReply(reply, level + 1))}
        </div>
      )}

      {isReplying &&
        (exists ? (
          <div ref={formRef}>
            <CommentsForm parentId={comment._id} />
          </div>
        ) : (
          <p ref={formRef} style={{ margin: '0 0 30px 30px' }}>
            <Link
              className="comment-warn"
              to="/login"
              state={{ back: window.location.pathname + window.location.search }}
            >
              Войдите
            </Link>
            , чтобы иметь возможность ответить.{' '}
            <Link onClick={handleCancel} className="comments-form-cancel-link">
              Отмена
            </Link>
          </p>
        ))}
    </div>
  );
};

export default React.memo(CommentView);
