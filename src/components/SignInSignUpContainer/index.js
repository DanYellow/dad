import React, { Component } from 'react';
import { withRouter } from 'react-router';



// import SignIn from './SignIn';
import SignIn from './SignInForm';



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
      <div className="App">
        <SignIn onSubmit={this._handleSubmit}/>
      </div>
    );
  }
}

export default withRouter(SignInSignUpContainer);
