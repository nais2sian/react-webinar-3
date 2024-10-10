import React from 'react';
import './style.css';

const CommentsFormView = ({
  formTitle,
  text,
  onChangeText,
  onSubmit,
  onCancel,
  isNewComment
}) => {
  return (
    <div style={{ marginLeft: isNewComment ? '30px' : '0' }}>
      <form className="comments-form" onSubmit={onSubmit}>
        <h4 className="comments-form-header">{formTitle}</h4>
        <textarea
          className="comments-form-textarea"
          value={text}
          onChange={e => onChangeText(e.target.value)}
          placeholder="Напишите ваш комментарий"
        ></textarea>
        <div>
          <button className="comments-form-button" type="submit">
            Отправить
          </button>
          {!isNewComment && (
            <button onClick={onCancel} className="comments-form-cancel-button">
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentsFormView;
