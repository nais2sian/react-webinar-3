import React, { useCallback, useState, useEffect } from 'react';
import ProductList from './components/productList';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { totalPrice, uniqueTotal, list, basket } = store.getState();

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
      code => {
        store.addItem(code);
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Cart basket={basket} totalPrice={totalPrice} onDelete={callbacks.onDeleteItem} />
      </Modal>
      <ProductList list={list} onAction={callbacks.onAddItem} isInCart={false} />
    </PageLayout>
  );
}

export default App;
