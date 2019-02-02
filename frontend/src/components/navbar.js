import React from 'react';
import {Navbar, NavItem} from 'react-materialize';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {enableGuestMode} from './../actions/appointmentActions';
import './navbar.css';

export const Nav = (props) => {
  return (
    <Navbar className="nav" brand='React Appointment Scheduler' left>
      <NavItem node={<div></div>}>
        <Link className="navLink" to="/">Home</Link>
      </NavItem>
      <NavItem node={<div></div>} href='components.html'>
        {
          props.currentUserAuthenticated | props.guestMode ?
            <Link className="navLink" to="/schedule">Schedule</Link>
            :
            <Link onClick={() => props.dispatch(enableGuestMode())} className="navLink" to="/schedule">Guest</Link>
        }
          
      </NavItem>

    </Navbar>
  );
};


const mapStateToProps = (state) => ({
  guestMode: state.guestMode,
  currentUserAuthenticated: state.currentUserAuthenticated
});

export default connect(mapStateToProps)(Nav);