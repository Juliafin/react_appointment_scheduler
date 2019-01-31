import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Input, Button} from 'react-materialize';
import {
  toggleRegistration,
  unsetRegistration,
  setRegistration,
  setPassword,
  setEmail,
  validateEmail,
  validatePassword,
  validateSignInSignUp
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

  determineRegistration() {
    console.log('inside determine registration', this.props.registration);
    if (this.props.match.url === '/login') {
      this.props.dispatch(unsetRegistration());
      console.log('match url is login');
    } else if (this.props.match.url === '/register') {
      console.log('match url is register');
      this.props.dispatch(setRegistration());
    }
  }

  toggleRegistration() {
    this.props.dispatch(toggleRegistration());
  }

  render () {
    console.log(this.props, 'props in signin component');
    return (
      <div className="slowPopIn" id="signUpSignIn">
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
              error={!this.props.emailValid ? 'Email is invalid' : ''}/>
          </Col>
          <Col m={6} offset="m5">
            <Input
              label="Password"
              type="password"
              id="password"
              onChange={this.setPassword}
              success={this.props.passwordValid ? '\u2713' : ''}
              error={!this.props.passwordValid ? 'Between 6 and 20 characters. Must contain a lowercase, uppercase, number, and special character.' : ''}/>
          </Col>
        </Row>

        <Row>
          
        </Row>
        <Row>
          <Button 
            waves="green" 
            id="authSubmit"
            disabled={this.props.signInSignUpFormValid ? false : true}>
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
  signInSignUpFormValid: state.signInSignUpFormValid
});

export default connect(mapStateToProps)(SignUpSignIn);
