import React from 'react';
import './style.css';
import List from '../list';
import { formatPrice } from '../../utils';


function Cart({ basket, totalPrice, onDelete }) {
  return (
    <div>
      {basket.length === 0 ? (
        <p className="cart__empty">В корзине пока ничего нет</p>
      ) : (
        <>
          <List items={basket} onAction={onDelete} isInCart={true} />
          <div className="cart__total">
            <span> Итого</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(Cart);
