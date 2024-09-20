import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Корзина</h2>
          <button className="modal__button" onClick={onClose}>
            Закрыть
          </button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Modal);
