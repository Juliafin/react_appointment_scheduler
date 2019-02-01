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
    if (this.props.ipData) {
      ipInfo = ` guest from ${this.props.ipData.city}, ${this.props.ipData.region}!`;
    }
    return (
      <div className="headerContainer slowPopIn">
        <header className="App-header">
          <p className="welcomeText">
          Welcome{ipInfo ? ipInfo: '!'} Please login or try out the app in Guest Mode!
          </p>
        </header>
        {
          !this.props.currentUserAuthenticated ?
            <div className="welcome">
              <Button 
                waves="green">
                <Link to="/login">
                Login
                </Link>
              </Button>
              <Button 
                waves="green">
                <Link to="/register">
                Register
                </Link>
              </Button>
              
              <Button waves="green">
                <Link onClick={this.guestMode} to="/schedule">
                Guest
                </Link>
              </Button>
            </div>
            :
            <div className="welcome">
              <Button waves="green">
                <Link to="/schedule">
                Schedule
                </Link>
              </Button>
            </div>
        }
      
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  guestMode: state.guestMode,
  ipData: state.ipData,
  currentUserAuthenticated: state.currentUserAuthenticated
});

export default connect(mapStateToProps)(Home);
