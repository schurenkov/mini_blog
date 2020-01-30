import React from 'react';
import Popup from '../../pages/main/components/Popup';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div>
      <Link to="/">
        <h1>Blog</h1>
      </Link>
      <Popup />
    </div>
  </header>
);

export default Header;
