import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/navbar';
import Schedule from './pages/schedule';
import SignUpSignIn from './pages/signUpSignIn';
import Home from './pages/home';
import {setAppointmentTimes} from './actions/appointmentActions';
import generateTimes from './utils/generateSchedule';
import './App.css';

class App extends Component {

  componentDidMount() {
    let times = generateTimes(this.props.initialHour, this.props.endHour);
    this.props.dispatch(setAppointmentTimes(times));
  }

  


  render() {
    return (
      <div className="App">
        <div className="headerContainer">
          <Nav/>
          <Route exact path="/" component={Home}/>
          <Route path="/schedule" component={Schedule}/>
          <Route path="/:path(login|register)" component={SignUpSignIn}/>
          {/* <Route path="/register" component={SignUpSignIn}/> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialHour: state.initialHour,
  endHour: state.endHour
});


export default withRouter(connect(mapStateToProps)(App));