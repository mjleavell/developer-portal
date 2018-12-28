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
import resourcesRequest from '../helpers/data/resourcesRequest';
import podcastsRequests from '../helpers/data/podcastsRequests';
import blogsRequest from '../helpers/data/blogsRequest';

class App extends Component {
  state = {
    authed: false,
    tutorials: [],
    resources: [],
    blogs: [],
    podcasts: [],
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

    const getAllResources = () => {
      const uid = authRequests.getCurrentUid();
      resourcesRequest.getResources(uid).then((resources) => {
        this.setState({ resources });
      })
        .catch(err => console.error('get tutorials', err));
    };

    const getAllPodcasts = () => {
      const uid = authRequests.getCurrentUid();
      podcastsRequests.getPodcasts(uid).then((podcasts) => {
        this.setState({ podcasts });
      })
        .catch(err => console.error('get tutorials', err));
    };

    const getAllBlogs = () => {
      const uid = authRequests.getCurrentUid();
      blogsRequest.getBlogs(uid).then((resources) => {
        this.setState({ resources });
      })
        .catch(err => console.error('get tutorials', err));
    };

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getAllTutorials();
        getAllResources();
        getAllPodcasts();
        getAllBlogs();
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
              resources={this.state.resources}
              podcasts={this.state.podcasts}
              blogs={this.state.blogs}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
