import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import ProfileView from '../../components/profile-view';
import useStore from '../../hooks/use-store';
import AuthButton from '../authButton';

const ProfilePage = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { loading, userData, token } = useSelector(state => state.userState);

  useEffect(() => {
    if (token) {
      store.actions.userState.fetchProfile(token);
    } else {
      navigate('/login');
    }
  }, [token, navigate, store.actions.userState]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  if (loading || !userData || !userData.profile) {
    return <Spinner active={select.waiting} />;
  }

  return (
    <PageLayout>
      <AuthButton/>
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileView
        username={userData.profile.name}
        phone={userData.profile.phone}
        email={userData.email}
      />
    </PageLayout>
  );
};

export default ProfilePage;
