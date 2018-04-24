import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store';
import SearchBar from './SearchBar';

const Navbar = ({ handleClick, isLoggedIn, numOfItems }) => (
  <div>
    <div className="navbar-container-outer">
      <div className="navbar-container">
        <NavLink to="/">
          <h1 className="h1">LORDS OF CEREAL</h1>
        </NavLink>
        <nav>
          {isLoggedIn ? (
            <div className="navbar-div">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">
                Home
              </Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div className="navbar-div">
              {/* The navbar will show these links before you log in */}
              <NavLink to="/login">
                Login
              </NavLink>
              <NavLink to="/signup">
                Sign Up
              </NavLink>
            </div>
          )}
        </nav>
        <NavLink to="/cart">
          <input
            type="image"
            src="http://www.clker.com/cliparts/0/y/N/C/g/c/shopping-cart-th.png"
            width="50"
            name="cart"
          />
          <span>{numOfItems}</span>
        </NavLink>
      </div>
      <SearchBar />
    </div>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    numOfItems: Object.values(state.cart).reduce((total, quantity) => total + quantity, 0)
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
