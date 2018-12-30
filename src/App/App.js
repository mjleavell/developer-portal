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
    activeTab: 'tutorials',
    tutorials: [],
    resources: [],
    blogs: [],
    podcasts: [],
    items: [],
  }

  getAllItems = () => {
    //   const uid = authRequests.getCurrentUid();
    //   portalRequests.getItems(uid, type).then((items) => {
    //     this.setState({ items });
    //   });
    const uid = authRequests.getCurrentUid();
    tutorialsRequest.getTutorials(uid).then((tutorials) => {
      this.setState({ tutorials });
    });
    resourcesRequest.getResources(uid).then((resources) => {
      this.setState({ resources });
    });
    podcastsRequests.getPodcasts(uid).then((podcasts) => {
      this.setState({ podcasts });
    });
    blogsRequest.getBlogs(uid).then((blogs) => {
      this.setState({ blogs });
    })
      .catch(err => console.error('get tutorials', err));
  };

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const getAllItemz = this.getAllItems();
        this.setState({
          authed: true,
          getAllItemz,
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

  tabView = (tabId) => {
    const currentTabId = this.state.activeTab;
    if (currentTabId !== tabId) {
      this.setState({ activeTab: tabId });
    }
  };

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  deleteOne = (tutorialId) => {
    tutorialsRequest.deleteTutorial(tutorialId)
      .then(() => {
        tutorialsRequest.getTutorials()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  render() {
    const {
      authed,
      tutorials,
      resources,
      blogs,
      podcasts,
      activeTab,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({
        authed: false,
        tutorials: [],
        resources: [],
        blogs: [],
        podcasts: [],
      });
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
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
        <div className="row justify-content-around">
          <div className="col-3">
            <Profile />
          </div>
          <div className="col-8">
            <PortalForm />
            <Portal
              // items={items}
              tutorials={tutorials}
              resources={resources}
              podcasts={podcasts}
              blogs={blogs}
              deleteSingleTutorial={this.deleteOne}
              activeTab={activeTab}
              tabView={this.tabView}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
