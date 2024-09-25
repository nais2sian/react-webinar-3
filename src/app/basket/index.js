import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useNavigate } from 'react-router-dom';

function Basket() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openProductDetails: useCallback(id => navigate(`/product/${id}`), [navigate]),
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onClick={() => {
              callbacks.closeModal();
              callbacks.openProductDetails(item._id);
            }}
          />
        );
      },
      [callbacks.removeFromBasket, callbacks.openProductDetails],
    ),
  };

  return (
    <ModalLayout title="Корзина" onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
