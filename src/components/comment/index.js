import React, { useEffect, useState } from 'react';
import './style.css';
import CommentsForm from '../../containers/comments-form';
import useSelector from '../../hooks/use-selector';
import { useSelector as useReduxSelector } from 'react-redux';

const Comment = ({ comment, onReply, commentsCount }) => {
  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  const replyTo = useReduxSelector(state => state.reviews.replyTo);
  const isReplying = replyTo === comment._id;

  return (
    <div className="comment" >
      {commentsCount && <h3>Комментарии ({commentsCount})</h3>}
      <div className="comment-item">
        <strong className="comment-author">{comment.author.profile.name}</strong>{' '}
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
          {comment.replies.map(reply => (
            <Comment
              key={reply._id}
              comment={reply}
              onReply={onReply}
              commentsCount={null}
            />
          ))}
        </div>
      )}

      {isReplying &&
        (select.exists ? (
          <CommentsForm parentId={comment._id} />
        ) : (
          <p className="comment-warn">
            {' '}
            <a href="/login">Войдите,</a> чтобы иметь возможность ответить.
          </p>
        ))}
    </div>
  );
};

export default React.memo(Comment);
