import React, { useCallback, useState, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(store.total);
  const [totalPrice, setTotalPrice] = useState(store.totalPrice);
  const [uniqueTotal, setUniqueTotal] = useState(store.uniqueTotal);

  useEffect(() => {
    const handleStoreUpdate = () => {
      const updatedTotal = store.getState().total;
      const updatedTotalPrice = store.getState().totalPrice;
      const updatedUniqueTotal = store.getState().uniqueTotal;
      console.log('Store обновлен. Текущее количество товаров: ' + updatedTotal);
      setTotalItems(updatedTotal);
      setTotalPrice(updatedTotalPrice);
      setUniqueTotal(updatedUniqueTotal);
    };
    const unsubscribe = store.subscribe(handleStoreUpdate);
    return () => {
      unsubscribe();
    };
  }, [store]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      (code, title, price) => {
        store.addItem(code, title, price);
      },
      [store],
    ),

    getTotal: useCallback(() => {
      return store.getState().basket;
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls totalItems={uniqueTotal} totalPrice={totalPrice} onOpenCart={openModal} />
      <CartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        list={list}
        basket={callbacks.getTotal()}
        totalPrice={totalPrice}
        onDelete={callbacks.onDeleteItem}
      />
      <List list={list} onAddItem={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
