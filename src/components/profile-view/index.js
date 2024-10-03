import React from 'react';
import './style.css';

function ProfileView({ username, phone, email }) {
  return (
<main className="Profile-content">
  <h1 className="Profile-title">Профиль</h1>
  <div className="Profile-item">
    <span className="Profile-label">Имя: </span>
    <span className="Profile-value bold">{username}</span>
  </div>
  <div className="Profile-item">
    <span className="Profile-label">Телефон: </span>
    <span className="Profile-value">{phone}</span>
  </div>
  <div className="Profile-item">
    <span className="Profile-label">Email: </span>
    <span className="Profile-value">{email}</span>
  </div>
</main>

  );
}

ProfileView.propTypes = {

};

export default React.memo(ProfileView);
