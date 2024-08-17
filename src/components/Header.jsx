import PropTypes from 'prop-types';

const Header = ({ children }) => {
  return (
    <div className="h-[375px] w-full flex flex-col items-center justify-center bg-[#f8f296] px-3">
      {children}
    </div>
  );
};

// Define prop types for the Header component
Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
