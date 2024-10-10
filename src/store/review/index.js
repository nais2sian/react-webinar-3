import StoreModule from '../module';

class ReviewsState extends StoreModule {
  initState() {
    return {
      data: [],
      waiting: false,
    };
  }

  /**
   * Загрузка комментариев
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    this.setState({
      data: [],
      waiting: true,
    });

    try {
      const res = await this.services.api.request({
        url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=670260bb7dd498df5525e5ed`,
      });

      this.setState(
        {
          data: res.data.result.items,
          waiting: false,
        },
        'Загружен товар из АПИ',
      );
    } catch (e) {
      this.setState({
        data: [],
        waiting: false,
      });
    }
  }
}

export default ReviewsState;
