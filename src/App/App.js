import React, { Component } from 'react';

import connection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Portal from '../components/Portal/Portal';
import PortalForm from '../components/PortalForm/PortalForm';
import Profile from '../components/Profile/Profile';

import './App.scss';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    if (!this.state.authed) {
      return (
        <div className="App">
          <MyNavbar />
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar />
        <Portal />
        <PortalForm />
        <Profile />
      </div>
    );
  }
}

export default App;
