import React from 'react';
import './style.css';
import Item from '../item';

function CartModal({ isOpen, onClose, basket, totalPrice, onDelete }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="Modal-overlay" onClick={onClose}></div>
      <div className="Modal">
        <div className="Header">
          <h2 className="Title">Корзина</h2>
          <button className="Button" onClick={onClose}>
            Закрыть
          </button>
        </div>
        <div className="Content">
          {basket.length === 0 ? (
            <p className="Item-empty">В корзине пока ничего нет</p>
          ) : (
            <div className="List">
              {basket.map(item => (
                <Item key={item.code} item={item} onDelete={onDelete} isInCart={true} />
              ))}
              <div className="Item-total">
                <span> Итого</span>
                <span>{totalPrice + ' ₽'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(CartModal);
