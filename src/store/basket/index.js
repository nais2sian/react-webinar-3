import StoreModule from '../module';

class Basket extends StoreModule {
  initState() {
    let savedList = [];
    let savedSum = 0;
    let savedAmount = 0;

    try {
      const storedList = localStorage.getItem('basketList');
      const storedSum = localStorage.getItem('basketSum');
      const storedAmount = localStorage.getItem('basketAmount');

      savedList = storedList ? JSON.parse(storedList) : [];
      savedSum = storedSum ? Number(storedSum) : 0;
      savedAmount = storedAmount ? Number(storedAmount) : 0;
    } catch (error) {
      console.error('Ошибка при чтении данных корзины из localStorage:', error);
    }

    return {
      list: savedList,
      sum: savedSum,
      amount: savedAmount,
    };
  }

  saveStateToLocalStorage() {
    const { list, sum, amount } = this.getState();
    localStorage.setItem('basketList', JSON.stringify(list));
    localStorage.setItem('basketSum', sum);
    localStorage.setItem('basketAmount', amount);
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasket(_id) {
    let sum = 0;
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true;
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      const item = this.store.getState().catalog.list.find(item => item._id === _id);
      list.push({ ...item, amount: 1 });
      sum += item.price;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );

    this.saveStateToLocalStorage();
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );

    this.saveStateToLocalStorage();
  }
}

export default Basket;
