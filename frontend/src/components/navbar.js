import React from 'react';
import {Navbar, NavItem} from 'react-materialize';
import {Link} from 'react-router-dom';
import './navbar.css';

const Nav = () => {

  return (
    <Navbar className="nav" brand='React Appointment Scheduler' left>
      <NavItem onClick={() => console.log('test click')}>
        <Link className="navLink" to="/">Home</Link>
      </NavItem>
      <NavItem href='components.html'>
        <Link className="navLink" to="/scheduler">Schedule</Link>
      </NavItem>
    </Navbar>
  );
};

export default Nav;