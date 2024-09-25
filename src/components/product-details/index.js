import React, { useEffect, useState, memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import { Link } from 'react-router-dom';
import './style.css';

const ProductDetails = () => {
  const { id } = useParams();
  const store = useStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`, // URL для загрузки данных о товаре
        );
        const data = await response.json();
        setProduct(data.result);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const callbacks = {
    addToBasket: useCallback(
      () => store.actions.basket.addToBasket(id),
      [id, store.actions.basket],
    ),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store.actions.modals]),
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const { title, description, madeIn, category, edition, price } = product;

  return (
    <PageLayout>
      <Head title={title} />
      <nav>
        <Link className="link" to="/">
          Главная
        </Link>
      </nav>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />

      <div className="details">
        <div className="details-content">
          <p>{typeof description === 'string' ? description : 'Описание недоступно'}</p>
          <p>
            Страна производитель:{' '}
            <span>
              {madeIn?.title || 'Не указана'} {madeIn?.code ? `(${madeIn.code})` : ''}
            </span>
          </p>
          <p>
            Категория: <span>{category?.title || 'Не указана'}</span>
          </p>
          <p>
            Год выпуска: <span>{edition || 'Не указан'}</span>
          </p>
          <p className="details-price">
            <span>Цена: {typeof price === 'number' ? `${price} ₽` : 'Не указана'}</span>
          </p>
          <button onClick={callbacks.addToBasket}>Добавить</button>
        </div>
      </div>
    </PageLayout>
  );
};

export default memo(ProductDetails);
