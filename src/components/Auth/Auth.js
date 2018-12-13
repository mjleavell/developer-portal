import React from 'react';
import authRequests from '../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      // do stuff
    }).catch(err => console.error('auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className='btn btn-danger' onClick={this.authenticateUser}>Login to Github</button>
      </div>
    );
  }
}

export default Auth;
