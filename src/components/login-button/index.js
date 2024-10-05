import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function Login({ onClick, title, name, link }) {
  return (
    <div className="Login-container">
      <div className="link">
        {name && link && (
          <Link to={link} className="profile-link">
            {name}
          </Link>
        )}
      </div>
      <button className="login-button" onClick={onClick}>
        {title}
      </button>
    </div>
  );
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string,
};

export default Login;
