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
    <div style={{ marginLeft: '30px' }}>
      <form className="comments-form" onSubmit={(e) => onSubmit(e)}>
        <h4 className="comments-form-header">{formTitle}</h4>
        <textarea
          className="comments-form-textarea"
          value={text}
          onChange={e => onChangeText(e.target.value)}
        ></textarea>
        <div>
          <button
          className="comments-form-button" type="submit"  disabled={!text.trim()}>
            Отправить
          </button>
          {!isNewComment && (
            <button onClick={onCancel} className="comments-form-cancel-button"
            type="button"
            >
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentsFormView;
