import StoreModule from '../module';

/**
 * Состояние категорий
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние категорий
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      loading: false,
      error: null,
    };
  }

  /**
   * Загрузка списка категорий
   */
  async loadCategories() {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      this.setState({
        categories: data.result.items,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message || 'Failed to fetch categories',
      });
    }
  }
}

export default CategoryState;
