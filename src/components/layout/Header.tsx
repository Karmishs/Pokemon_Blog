import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    const location = useLocation();
    const [tabActive, setTabActive] = useState(location.pathname);

    useEffect(() => {
        setTabActive(location.pathname);
    }, [location.pathname]);

  return (
    <header>
      <img src="/logo.webp" alt="Pokemon Logo" />
      
      <nav>
        <ul>
          <li>
            <Link 
              to="/"
              className={tabActive === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/search" 
              className={tabActive === '/search' ? 'active' : ''}
            >
              Search
            </Link>
          </li>
          <li>
            <Link 
              to="/pokemon" 
              className={tabActive === '/pokemon' ? 'active' : ''}
            >
              Pokemon
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={tabActive === '/about' ? 'active' : ''}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
