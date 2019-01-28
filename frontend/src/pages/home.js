import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-materialize';
import {Link} from 'react-router-dom';
import {enableGuestMode} from './../actions/appointmentActions';
import './home.css';
import {getIpInfo} from './..//actions/appointmentActions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.guestMode = this.guestMode.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getIpInfo());
  }

  guestMode() {
    this.props.dispatch(enableGuestMode());
  }

  render() {
    return (
      <div className="headerContainer">
        <header className="App-header">
          <p className="welcomeText">
          Welcome! Please login or try out the app in Guest Mode!
          </p>
        </header>
        <div className="welcome">
          <Button waves="green">
            <Link to="/login">
            Login
            </Link>
          </Button>
          <Button waves="green">
            <Link onClick={this.guestMode} to="/schedule">
            Guest
            </Link>
          </Button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  guestMode: state.guestMode
});

export default connect(mapStateToProps)(Home);
