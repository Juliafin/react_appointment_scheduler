import React, { Component } from 'react';
import Nav from './components/navbar';
import {Route} from 'react-router-dom';
import Schedule from './pages/schedule';
import Home from './pages/home';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="headerContainer">
          <Nav/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/schedule" component={Schedule}/>
        </div>
      </div>
    );
  }
}


export default App;