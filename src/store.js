/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.maxNum = 0;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  defCode(code) {
    if (code > this.maxNum) {
      this.maxNum = code;
    }
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    (this.maxNum = this.maxNum + 1),
      this.setState({
        ...this.state,
        list: [
          ...this.state.list,
          { code: this.maxNum, title: 'Новая запись', counter: 0, selected: false },
        ],
      });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        const isSelected = item.code === code ? !item.selected : false;
        return {
          ...item,
          selected: isSelected,
          counter: isSelected ? item.counter + 1 : item.counter,
        };
      }),
    });
  }
}

export default Store;
