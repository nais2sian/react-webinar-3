import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAdd, onDelete, isInCart }) {
  const handleButtonClick = () => {
    if (isInCart) {
      onDelete(item.code);
    } else {
      onAdd(item.code, item.title, item.price);
    }
  };

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{item.price.toLocaleString('ru-RU') + ' ₽'}</div>

      {isInCart && <div className="Item-number">{item.quantity} шт</div>}

      <div className="Item-actions">
        <button onClick={handleButtonClick}>{isInCart ? 'Удалить' : 'Добавить'}</button>
      </div>
    </div>
  );
}

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
