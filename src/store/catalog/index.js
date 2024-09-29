import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    let savedList = [];
    let savedTotal = 0;
    let savedCurrentPage = 1;

    try {
      const catalogList = localStorage.getItem('catalogList');
      const catalogTotal = localStorage.getItem('catalogTotal');
      const catalogCurrentPage = localStorage.getItem('catalogCurrentPage');

      savedList = catalogList ? JSON.parse(catalogList) : [];
      savedTotal = catalogTotal ? JSON.parse(catalogTotal) : 0;
      savedCurrentPage = catalogCurrentPage ? Number(catalogCurrentPage) : 1;
    } catch (error) {
      console.error('Ошибка при чтении из localStorage:', error);
    }

    return {
      list: savedList,
      total: savedTotal,
      currentPage: savedCurrentPage,
      limit: 10,
    };
  }

  get totalPages() {
    return Math.ceil(this.getState().total / this.getState().limit);
  }

  async load(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    try {
      const response = await fetch(
        `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
      );
      const json = await response.json();

      if (json.result) {
        this.setState(
          {
            list: json.result.items,
            total: json.result.count,
            currentPage: page,
            limit,
          },
          'Загружены товары из АПИ',
        );

        if (json.result.items && json.result.items.length > 0) {
          localStorage.setItem('catalogList', JSON.stringify(json.result.items));
        }

        if (json.result.count !== undefined) {
          localStorage.setItem('catalogTotal', JSON.stringify(json.result.count));
        }

        localStorage.setItem('catalogCurrentPage', String(page));
      } else {
        console.error('Ошибка: некорректная структура данных с сервера.', json);
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных с сервера:', error);
    }
  }
}

export default Catalog;
