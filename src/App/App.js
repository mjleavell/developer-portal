import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Portal from '../components/Portal/Portal';
import PortalForm from '../components/PortalForm/PortalForm';
import Profile from '../components/Profile/Profile';

import connection from '../helpers/data/connection';
import authRequests from '../helpers/data/authRequests';
import './App.scss';
import tutorialsRequest from '../helpers/data/tutorialsRequest';

class App extends Component {
  state = {
    authed: false,
    tutorials: [],
  }

  componentDidMount() {
    connection();

    const getAllTutorials = () => {
      const uid = authRequests.getCurrentUid();
      tutorialsRequest.getTutorials(uid).then((tutorials) => {
        this.setState({ tutorials });
      })
        .catch(err => console.error('get tutorials', err));
    };

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getAllTutorials();
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

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
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
        <div className="row justify-content-around">
          <div className="col-3">
            <Profile />
          </div>
          <div className="col-8">
            <PortalForm />
            <Portal
              tutorials={this.state.tutorials}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
