import React, {Component} from 'react';
import {connect} from 'react-redux';

class Schedule extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.guestMode ? (
          <div style={{color:'white'}}>You are in guest mode!</div>
        ):
          <div style={{color:'white'}}>You are not in guest mode!</div>
        }
        Hi This is a test;
      </div>
    );
    
  }
}

const mapStateToProps = (state) => ({
  guestMode: state.guestMode
});

export default connect(mapStateToProps)(Schedule);