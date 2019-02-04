import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Input, Button, Modal} from 'react-materialize';
import {
  toggleRegistration,
  unsetRegistration,
  setRegistration,
  setPassword,
  setEmail,
  validateEmail,
  validatePassword,
  validateSignInSignUp,
  registerUser,
  loginUser,
  signInSignUpFailedReset
} from './../actions/appointmentActions';
import './signUpSignIn.css';


class SignUpSignIn extends Component {
  constructor(props) {
    super(props);
    this.toggleRegistration = this.toggleRegistration.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleSignUpSignIn = this.handleSignUpSignIn.bind(this);
    this.keyDownSubmit = this.keyDownSubmit.bind(this);
    this.signSignUpFailureReset = this.signSignUpFailureReset.bind(this);
  }

  componentDidMount() {
    this.determineRegistration();
  }

  setPassword(event) {
    let password = event.target.value;
    this.props.dispatch(setPassword(password));
    this.validatePassword();
    this.validateSignInSignUpForm();
  }

  setEmail(event) {
    let email = event.target.value;
    this.props.dispatch(setEmail(email));
    this.validateEmail();
    this.validateSignInSignUpForm();
  }

  validatePassword() {
    this.props.dispatch(validatePassword());
  }

  validateEmail() {
    this.props.dispatch(validateEmail());
  }

  validateSignInSignUpForm() {
    this.props.dispatch(validateSignInSignUp());
  }

  handleSignUpSignIn() {
    console.log('this.props inside handle signup sign in', this.props);
    if (this.props.signInSignUpFormValid) {
      if (this.props.registration) {
        this.props.dispatch(registerUser(this.props.email, this.props.password));
      } else {
        this.props.dispatch(loginUser(this.props.email, this.props.password));
      }
    }
  }


  determineRegistration() {
    if (this.props.match.url === '/login') {
      this.props.dispatch(unsetRegistration());
    } else if (this.props.match.url === '/register') {
      this.props.dispatch(setRegistration());
    }
  }

  toggleRegistration() {
    this.props.dispatch(toggleRegistration());
  }

  keyDownSubmit(event) {
    if (event.key === "Enter") {
      this.handleSignUpSignIn();
    }
  }

  signSignUpFailureReset() {
    this.props.dispatch(signInSignUpFailedReset());
  }

  render () {
    let failure = this.props.registration ? 'Sign up' : 'Sign in';
    let modalHeader = `${failure} failed`;
    return (
      <div className="slowPopIn" id="signUpSignIn">
        <Modal
          header={modalHeader}
          open={this.props.signInSignUpFailed}
          fixedFooter
          actions={
            <Button
              id="closeModal"
              onClick={this.signSignUpFailureReset}>
              Close
            </Button>
          }>
          <p>
            {failure} failed. {this.props.registration ? 'There was an error registering the user.': 'The user already exists.'} 
          </p>
        </Modal>
        <div className="choice">I would like to: </div>
        <Row>
          <Col l={12}>
            <Input 
              type="switch"
              checked={this.props.registration}
              onClick={this.toggleRegistration}
              onLabel="Register"
              offLabel="Login"/>
          </Col>

        </Row>
        <Row>
          <Col m={6} offset="m5">
            <Input
              label="Email"
              id="email"
              onChange={this.setEmail}
              success={this.props.emailValid ? '\u2713' : ''}
              error={!this.props.emailValid ? 'Email is invalid' : ''}
              onKeyPress={this.keyDownSubmit}/>
          </Col>
          <Col m={6} offset="m5">
            <Input
              label="Password"
              type="password"
              id="password"
              onChange={this.setPassword}
              success={this.props.passwordValid ? '\u2713' : ''}
              error={!this.props.passwordValid ? 'Between 6 and 20 characters. Must contain a lowercase, uppercase, number, and special character.' : ''}
              onKeyPress={this.keyDownSubmit}/>
          </Col>
        </Row>

        <Row>
          
        </Row>
        <Row>
          <Button 
            waves="green" 
            id="authSubmit"
            disabled={this.props.signInSignUpFormValid ? false : true}
            onClick={this.handleSignUpSignIn}>
            {this.props.registration ? 'Register' : 'Sign In'}
          </Button>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  registration: state.registration,
  emailValid: state.emailValid,
  passwordValid: state.passwordValid,
  signInSignUpFormValid: state.signInSignUpFormValid,
  password: state.password,
  email: state.email,
  signInSignUpFailed: state.signInSignUpFailed
});

SignUpSignIn.propTypes = {
  registration: PropTypes.bool,
  emailValid: PropTypes.bool,
  passwordValid: PropTypes.bool,
  signInSignUpFormValid: PropTypes.bool,
  password: PropTypes.string,
  email: PropTypes.string,
  signInSignUpFailed: PropTypes.string
};

export default connect(mapStateToProps)(SignUpSignIn);
