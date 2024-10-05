import StoreModule from '../module';

/**
 * Состояние профиля пользователя
 */
class ProfileState extends StoreModule {
  /**
   * Начальное состояние профиля
   * @return {Object}
   */
  initState() {
    return {
      profileData: {},
      loading: false,
      error: null,
    };
  }

  /**
   * Загрузка профиля по ID пользователя
   * @param {string} userId Идентификатор пользователя (может быть как текущий пользователь, так и другой)
   */
  async fetchProfile(userId) {
    this.setState(
      {
        ...this.getState(),
        loading: true,
      },
      'Загрузка профиля пользователя',
    );
    try {
      const response = await fetch(`/api/v1/users/${userId}?fields=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          profileData: json.result,
          loading: false,
        },
        'Профиль пользователя загружен',
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          loading: false,
          profileData: {},
          error: 'Ошибка загрузки профиля',
        },
        'Ошибка при загрузке профиля пользователя',
      );
    }
  }

  /**
   * Очистка ошибок
   */
  errorCleaning() {
    this.setState({
      ...this.getState(),
      error: null,
    });
  }
}

export default ProfileState;
