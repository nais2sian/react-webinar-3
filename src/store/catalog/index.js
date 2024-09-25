import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
    };
  }

  // Метод для загрузки списка товаров
  async load(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    try {
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
      const json = await response.json();

      if (json.result && Array.isArray(json.result.items)) {
        const currentState = this.getState();
        this.setState(
          {
            ...currentState,
            list: json.result.items,
            total: json.result.total,
            currentPage: page,
          },
          'Загружены товары из АПИ',
        );
      } else {
        console.error('Ошибка: некорректная структура данных с сервера.', json);
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных с сервера:', error);
    }
  }
}

export default Catalog;
