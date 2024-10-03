import StoreModule from '../module';

/**
 * Состояние пользователя - авторизация и профиль
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние пользователя
   * @return {Object}
   */
  initState() {
    return {
      token: localStorage.getItem('userToken') || null,
      isAuthenticated: !!localStorage.getItem('userToken'),
      userData: {}, // Профиль пользователя
      loading: false,
      error: null,
    };
  }
  /**
   * Авторизация пользователя
   * @param {Object} credentials (логин, пароль)
   */
  async login(credentials) {
    this.setState(
      {
        ...this.getState(),
        loading: true,
        error: null,
      },
      'Начало процесса авторизации',
    );

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok && data.result.token) {
        this.setState({ token: data.result.token, isAuthenticated: true, loading: false });
        localStorage.setItem('userToken', data.result.token);
        await this.fetchProfile(data.result.token);
        return data;
      } else {
        this.setState({ loading: false, error: data.message || 'Ошибка авторизации' });
      }
    } catch (error) {
      this.setState({ loading: false, error: error.message || 'Ошибка соединения' });
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    this.setState({
      token: null,
      isAuthenticated: false,
      userData: {},
    });
  }

  async checkAuth() {
    const { token } = this.getState();
    if (token) {
      await this.fetchProfile(token);
    } else {
      this.setState({ isAuthenticated: false });
    }
  }

  /**
   * Загрузка профиля пользователя
   * @param {string} token Токен пользователя
   */
  async fetchProfile(token) {
    this.setState(
      {
        ...this.getState(),
        loading: true,
      },
      'Загрузка профиля пользователя',
    );
    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      const json = await response.json();
      console.table(json.result),
        this.setState(
          {
            ...this.getState(),
            userData: json.result,
            loading: false,
          },
          'Профиль пользователя загружен',
        );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          loading: false,
          userData: {},
          error: 'Ошибка загрузки профиля',
        },
        'Ошибка при загрузке профиля пользователя',
      );
    }
  }
}

export default UserState;
