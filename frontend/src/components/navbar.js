import React from 'react';
import {Navbar, NavItem, Button} from 'react-materialize';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {enableGuestMode, logout} from './../actions/appointmentActions';
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
      {
        props.currentUserAuthenticated ?
          <NavItem>
            <Button className="waves-red waves-effect logOut" onClick={() => props.dispatch(logout())}>
              Log Out
            </Button>
          </NavItem>
          :
          null
      }

    </Navbar>
  );
};


const mapStateToProps = (state) => ({
  guestMode: state.guestMode,
  currentUserAuthenticated: state.currentUserAuthenticated
});

Nav.propTypes = {
  guestMode: PropTypes.bool,
  currentUserAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps)(Nav);