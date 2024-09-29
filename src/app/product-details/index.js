import React, { useEffect, useState, memo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import Menu from '../../components/menu';
import ProductView from '../../components/product-view';

const ProductDetails = () => {
  const { id } = useParams();
  const store = useStore();
  const navigate = useNavigate();
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
          `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
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
    navigateToPage: useCallback(() => {
      navigate(`/`);
    }, [navigate]),
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const { title, description, madeIn, category, edition, price } = product;

  return (
    <PageLayout
      head={<Head title={title} />}
      menu={<Menu currentPage={1} onNavigate={callbacks.navigateToPage} />}
      footer={<div></div>}
    >
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductView
        title={title}
        description={description}
        madeIn={madeIn}
        category={category}
        edition={String(edition)}
        price={price}
        onAddToBasket={callbacks.addToBasket}
      />
    </PageLayout>
  );
};

export default memo(ProductDetails);
