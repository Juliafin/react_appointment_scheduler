import React, { Component } from 'react';
import Nav from './components/navbar';
import {Route} from 'react-router-dom';
import Home from './pages/home.js';
// import {connect} from 'react-redux';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Nav/>
          <Route path="/" component={Home}/>
        <p>Test</p>
      </div>
    );
  }
}

export default App;
