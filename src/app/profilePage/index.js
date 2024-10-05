import React from 'react';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import ProfileView from '../../components/profile-view';
import AuthButton from '../authButton';
import useTranslate from '../../hooks/use-translate';

const ProfilePage = () => {
  const { loading, sessionUserData } = useSelector(state => state.userState);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  if (loading || !sessionUserData || !sessionUserData.profile) {
    return <Spinner active={select.waiting} />;
  }

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthButton />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileView
        username={sessionUserData.profile.name}
        phone={sessionUserData.profile.phone}
        email={sessionUserData.email}
      />
    </PageLayout>
  );
};

export default ProfilePage;
