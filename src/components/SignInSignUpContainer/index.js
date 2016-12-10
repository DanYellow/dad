import React, { Component } from 'react';
import { withRouter } from 'react-router';



// import SignIn from './SignIn';
import SignIn from './SignInForm';
import SignUp from './SignInForm';



import './style.scss';

class SignInSignUpContainer extends Component {
  constructor(props) {
    super(props);
  }

  _handleSubmit (values) {
    // Do something with the form values
    console.log(values);
  }

  render() {
    return (
      <div className='App'>

        { this.props.router.routes[1].path === 'signin' && <SignIn onSubmit={this._handleSubmit}/> }
        { this.props.router.routes[1].path === 'signup' && <SignUp onSubmit={this._handleSubmit}/> }
        
      </div>
    );
  }
}

export default withRouter(SignInSignUpContainer);
