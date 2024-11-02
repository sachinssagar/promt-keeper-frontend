import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          My Promts
        </Link>
        <Link className="btn" to="/add">
          Add Item
        </Link>
      </div>
    </nav>
  );
}

export default Header;
