import React from 'react';
import authRequests from '../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate()
      .then((results) => {
        const userName = results.additionalUserInfo.username;
        const currentUid = results.user.uid;
        const profile = results;
        this.props.isAuthenticated(userName, currentUid, profile);
      }).catch(err => console.error('auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className='btn btn-outline-light auth-btn' onClick={this.authenticateUser}>
          <img className="github-login-btn" src="https://help.dropsource.com/wp-content/uploads/sites/4/2017/02/gh-login-button.png" alt="github img"></img>
        </button>
      </div>
    );
  }
}

export default Auth;
