import PropTypes from 'prop-types';
const Header = ({ title }) => {
  return (
    <header>
      <h1>domundotech {title}</h1>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string
};

Header.defaultProps = {
  title: 'web services'
};

export default Header;
