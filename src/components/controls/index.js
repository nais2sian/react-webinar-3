import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ totalItems, onOpenCart, totalPrice }) {
  return (
    <div className="controls">
      <div>
        В корзине:
        <span className="controls__total">
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
        </span>{' '}
        <button className="controls__button" onClick={onOpenCart}>
          Перейти
        </button>
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
