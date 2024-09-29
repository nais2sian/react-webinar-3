import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Menu from '../../components/menu';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const store = useStore();
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? Number(savedPage) : 1;
  });

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    store.actions.catalog.load(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, store.actions.catalog]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    total: state.catalog.total,
  }));

  const totalPages = Math.ceil(select.total / itemsPerPage);

  const callbacks = {
    openProductDetails: useCallback(id => navigate(`/product/${id}`), [navigate]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store.actions.basket]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store.actions.modals]),
    navigateToPage: useCallback(
      page => {
        console.log(`Переключение на страницу ${page}`);
        setCurrentPage(page);
        navigate(`/`);
      },
      [navigate],
    ),
  };

  const renders = {
    item: useCallback(
      item => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          onClick={() => callbacks.openProductDetails(item._id)}
        />
      ),
      [callbacks.addToBasket, callbacks.openProductDetails],
    ),
  };

  const handlePageChange = page => {
    console.log(`handlePageChange вызван с page: ${page}`);
    setCurrentPage(page);
    navigate(`/`);
  };

  return (
    <PageLayout
      head={<Head title="Магазин" />}
      menu={<Menu currentPage={currentPage} onNavigate={() => callbacks.navigateToPage(1)} />} // Переход на первую страницу
      footer={<div></div>}
    >
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
