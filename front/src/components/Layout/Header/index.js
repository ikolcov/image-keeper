// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Header = ({ user }: { user: { [key: string]: string } | null }) => {
  if (user) {
    return (
      <ul className="Menu">
        <li className="Menu__element">
          <NavLink exact to="/upload" className="Link" activeClassName="Link--active">
            Upload
          </NavLink>
        </li>
        <li className="Menu__element">
          <NavLink exact to="/myuploads" className="Link" activeClassName="Link--active">
            My uploads
          </NavLink>
        </li>
        <li className="Menu__element">
          <NavLink to="/logout" className="Link">Logout</NavLink>
        </li>
      </ul>
    );
  }
  return (
    <ul className="Menu">
      <li className="Menu__element">
        <NavLink exact to="/" className="Link" activeClassName="Link--active">
          Home
        </NavLink>
      </li>
      <li className="Menu__element">
        <NavLink to="/signup" className="Link" activeClassName="Link--active">Signup</NavLink>
      </li>
      <li className="Menu__element">
        <NavLink to="/login" className="Link" activeClassName="Link--active">Login</NavLink>
      </li>
    </ul>
  );
};

export default Header;
