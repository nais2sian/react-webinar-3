import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Menu({ currentPage, onNavigate }) {
  const handleClick = () => {
    const targetPage = currentPage > 1 ? currentPage : 1;
    onNavigate(targetPage);
  };
  return (
    <nav className="menu">
      <span className="menu-item" onClick={handleClick}>
        Главная
      </span>
    </nav>
  );
}

Menu.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Menu;
