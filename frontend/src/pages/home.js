import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-materialize';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {enableGuestMode, checkTokenAndUserExists} from './../actions/appointmentActions';
import './home.css';
import {getIpInfo} from './..//actions/appointmentActions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.guestMode = this.guestMode.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(checkTokenAndUserExists());
    if (!this.props.ipData) {
      this.props.dispatch(getIpInfo());
    }
  }


  guestMode() {
    this.props.dispatch(enableGuestMode());
  }

  render() {
    console.log(this.props.ipData, 'ipdata in home.js!');
    let ipInfo = null;
    let user = this.props.currentUserAuthenticated ? this.props.currentUserEmail : 'guest';
    if (this.props.ipData) {
      ipInfo = ` from ${this.props.ipData.city}, ${this.props.ipData.region}!`;
    }
    return (
      <div className="headerContainer slowPopIn">
        <header className="App-header">
          <p className="welcomeText">
          Welcome {user} {ipInfo ? ipInfo: '!'} {!this.props.currentUserAuthenticated ? 'Please login or try out the app in Guest Mode!': 'Please continue to your schedule!'}
          </p>
        </header>
        {
          !this.props.currentUserAuthenticated ?
            <div className="welcome">
              <Link to="/login">
                <Button 
                  waves="green">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  waves="green">
                Register
                </Button>
              </Link>
              
              <Link onClick={this.guestMode} to="/schedule">
                <Button waves="green">
                Guest
                </Button>
              </Link>
            </div>
            :
            <div className="welcome">
              <Link to="/schedule">
                <Button waves="green">
                Schedule
                </Button>
              </Link>
            </div>
        }
      
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  guestMode: state.guestMode,
  ipData: state.ipData,
  currentUserAuthenticated: state.currentUserAuthenticated,
  currentUserEmail: state.currentUserEmail,
  currentUserID: state.currentUserID,
  currentUserToken: state.currentUserToken
});

Home.propTypes = {
  guestMode: PropTypes.bool,
  currentUserAuthenticated: PropTypes.bool,
  currentUserEmail: PropTypes.string,
  currentUserID: PropTypes.string,
  currentUserToken: PropTypes.string,
};

export default connect(mapStateToProps)(Home);
