import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ProductView = ({ title, description, madeIn, category, edition, price, onAddToBasket }) => (
  <div className="details">
    <div className="details-content">
      <h1></h1>
      <p>{typeof description === 'string' ? description : 'Описание недоступно'}</p>
      <p>
        Страна производитель:{' '}
        <span className="bold">
          {madeIn?.title || 'Не указана'} {madeIn?.code ? `(${madeIn.code})` : ''}
        </span>
      </p>
      <p>
        Категория: <span className="bold">{category?.title || 'Не указана'}</span>
      </p>
      <p>
        Год выпуска: <span className="bold">{edition || 'Не указан'}</span>
      </p>
      <p className="details-price">
        <span className="bold">Цена: {typeof price === 'number' ? `${price} ₽` : 'Не указана'}</span>
      </p>
      <button onClick={onAddToBasket}>Добавить</button>
    </div>
  </div>
);

ProductView.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  madeIn: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  category: PropTypes.shape({
    title: PropTypes.string,
  }),
  edition: PropTypes.string,
  price: PropTypes.number,
  onAddToBasket: PropTypes.func.isRequired,
};

export default ProductView;
