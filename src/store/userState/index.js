import StoreModule from '../module';

/**
 * Состояние пользователя - авторизация и сессия
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
      sessionUserData: {},
      loading: false,
      error: null,
    };
  }

  /**
   * Авторизация пользователя
   * @param {Object} credentials (логин, пароль)
   */
  async login(credentials) {
    this.setState({
      ...this.getState(),
      loading: true,
      error: null,
    }, 'Начало процесса авторизации');

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
        await this.fetchSessionProfile(data.result.token);
        return data;
      } else {
        throw new Error(data.error ? data.error.message : 'Authentication failed');
      }
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      throw error;
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

  /**
   * Выход из системы
   */
  async logout() {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      if (response.ok) {
        console.log('Токен удален');
      } else {
        console.error('Не удалось удалить токен:', response.status);
      }
    } catch (error) {
      console.error('Ошибка удаления токена:', error);
    }
    localStorage.removeItem('userToken');
    this.setState({
      token: null,
      isAuthenticated: false,
      sessionUserData: {},
    });
  }

  /**
   * Загрузка профиля текущего пользователя
   * @param {string} token Токен пользователя
   */
  async fetchSessionProfile(token) {
    this.setState(
      {
        ...this.getState(),
        loading: true,
      },
      'Загрузка профиля сессии пользователя',
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
      this.setState(
        {
          ...this.getState(),
          sessionUserData: json.result,
          loading: false,
        },
        'Профиль сессии пользователя загружен',
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          loading: false,
          sessionUserData: {},
          error: 'Ошибка загрузки профиля сессии',
        },
        'Ошибка при загрузке профиля сессии',
      );
    }
  }
}

export default UserState;
