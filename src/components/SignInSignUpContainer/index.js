import React, { Component } from 'react';
import { withRouter } from 'react-router';



import SignIn from './SignIn';



import './style.scss';

class SignInSignUpContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <SignIn />
      </div>
    );
  }
}

export default withRouter(SignInSignUpContainer);
