import React, { Component } from 'react';

import connection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import Portal from '../components/Portal/Portal';
import PortalForm from '../components/PortalForm/PortalForm';
import Profile from '../components/Profile/Profile';

import './App.scss';

class App extends Component {
  componentDidMount() {
    connection();
  }

  render() {
    return (
      <div className="App">
        <Auth />
        <Portal />
        <PortalForm />
        <Profile />
      </div>
    );
  }
}

export default App;
