import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import LoginView from '../../components/login-view';
import useStore from '../../hooks/use-store';
import AuthButton from '../authButton';

const LoginPage = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { loading, error } = useSelector(state => state.userState);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const onSubmit = e => {
    e.preventDefault();
    const credentials = { login, password };
    store.actions.userState
      .login(credentials)
      .then(() => {
        navigate('/profile');
      })
      .catch(error => {
        console.error('Ошибка при авторизации:', error);
      });
  };

  const onChangeLogin = e => setLogin(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);

  return (
    <PageLayout>
      <AuthButton />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginView
          login={login}
          password={password}
          onChangeLogin={onChangeLogin}
          onChangePassword={onChangePassword}
          onSubmit={onSubmit}
          isLoading={loading}
          errorMessage={error}
        />
      </Spinner>
    </PageLayout>
  );
};

export default memo(LoginPage);
