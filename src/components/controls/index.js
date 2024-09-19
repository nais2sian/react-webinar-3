import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ totalItems, onOpenCart, totalPrice }) {
  return (
    <div className="Controls">
     <div>
  В корзине:
  <span className="Total">
    {' '}
    {totalItems > 0 ? (
      <>
        {totalItems}{' '}
        {plural(totalItems, {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        })}
        {' / '}
        {totalPrice + ' ₽'}
      </>
    ) : (
      'пусто'
    )}
  </span>
  {' '}
  <button className="ToBasket" onClick={onOpenCart}>Перейти</button>
</div>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  openModal: () => {},
};

export default React.memo(Controls);
