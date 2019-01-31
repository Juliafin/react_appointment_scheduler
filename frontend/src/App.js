import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import moment from 'moment';
import Nav from './components/navbar';
import Schedule from './pages/schedule';
import Home from './pages/home';
import {setAppointmentTimes} from './actions/appointmentActions';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.generateTimes();
  }

  generateTimes() {
    const hours = [];
    for(let hour = this.props.initialHour, i = 0; hour < this.props.endHour + 1; hour++, i++) {
      hours.push({
        appointmentTime: moment({ hour }).format('h:mm A'),
        appointmentName: "+",
        appointmentIndex: i,
        appointmentPhoneNumber: "",
        edited: false
      });
    }
    console.log(hours);
    this.props.dispatch(setAppointmentTimes(hours));
  }


  render() {
    return (
      <div className="App">
        <div className="headerContainer">
          <Nav/>
          <Route exact path="/" component={Home}/>
          <Route path="/schedule" component={Schedule}/>
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