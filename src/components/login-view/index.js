import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LoginView({ login, password, onChangeLogin, onChangePassword, onSubmit, isLoading, errorMessage }) {
  return (
    <main className="Login-content">
      <h1 className="Login-title">Вход</h1>
      <form onSubmit={onSubmit} className="Login-form">
        <label>
          <span>Логин</span>
          <input type="text" onChange={onChangeLogin} value={login} />
        </label>
        <label>
          <span>Пароль</span>
          <input type="password" onChange={onChangePassword} value={password} />
        </label>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button className="Login-submit" type="submit" disabled={isLoading}>
          Войти
        </button>
      </form>
    </main>
  );
}

LoginView.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeLogin: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

export default React.memo(LoginView);
