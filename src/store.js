import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
    this.state.basket = this.state.basket || [];
    this.state.total = 0;
    this.state.totalPrice = 0;
    this.state.uniqueTotal = 0;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    console.log('Новое состояние: ', this.state);
    for (const listener of this.listeners) listener();
  }

  addItem(code, title, price) {
    const existingItem = this.state.basket.find(item => item.code === code);
    let newTotal, newTotalPrice, newBasket, newUniqueTotal;

    if (existingItem) {
      newBasket = this.state.basket.map(item =>
        item.code === code ? { ...item, quantity: item.quantity + 1 } : item,
      );
      newTotal = this.state.total + 1;
      newTotalPrice = this.state.totalPrice + Number(price);
      newUniqueTotal = this.state.uniqueTotal;
    } else {
      newBasket = [...this.state.basket, { code, price, title, quantity: 1 }];
      newTotal = this.state.total + 1;
      newTotalPrice = this.state.totalPrice + Number(price);
      newUniqueTotal = this.state.uniqueTotal + 1;
    }

    this.setState({
      basket: newBasket,
      total: newTotal,
      totalPrice: newTotalPrice,
      uniqueTotal: newUniqueTotal,
    });
  }

  deleteItem(code) {
    const itemToRemove = this.state.basket.find(item => item.code === code);
    if (!itemToRemove) {
      return;
    }
    const updatedBasket = this.state.basket.filter(item => item.code !== code);
    const newTotal = this.state.total - itemToRemove.quantity;
    const newTotalPrice = this.state.totalPrice - itemToRemove.price * itemToRemove.quantity;
    const isUniqueRemoved = !updatedBasket.some(item => item.code === code);
    const newUniqueTotal = isUniqueRemoved ? this.state.uniqueTotal - 1 : this.state.uniqueTotal;
    this.setState({
      basket: updatedBasket,
      total: newTotal,
      totalPrice: newTotalPrice,
      uniqueTotal: newUniqueTotal,
    });
  }
}

export default Store;
