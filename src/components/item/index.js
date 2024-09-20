import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice } from '../../utils';

function Item({ item, onAction, isInCart }) {
  const { code, title, price, quantity } = item;
  return (
    <div className="item">
      <div className="item__code">{code}</div>
      <div className="item__title">{title}</div>
      <div className="item__price">{formatPrice(price)}</div>
      {isInCart && <div className="item__number">{quantity} шт</div>}
      <div className="item__actions">
        <button onClick={() => onAction(code)}>{isInCart ? 'Удалить' : 'Добавить'}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  isInCart: PropTypes.bool,
};

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
