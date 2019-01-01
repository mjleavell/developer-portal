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
import gitHubRequests from '../helpers/data/gitHubRequests';
import './App.scss';
import tutorialsRequest from '../helpers/data/tutorialsRequest';
import resourcesRequest from '../helpers/data/resourcesRequest';
import podcastsRequests from '../helpers/data/podcastsRequests';
import blogsRequest from '../helpers/data/blogsRequest';

class App extends Component {
  state = {
    authed: false,
    gitHubUserName: '',
    gitHubProfile: '',
    uid: '',
    activeTab: 'tutorials',
    tutorials: [],
    resources: [],
    blogs: [],
    podcasts: [],
  }


  componentDidMount() {
    connection();

    const getAllItems = () => {
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

    const gitHubTest = (username) => {
      gitHubRequests.getGithubUser(username).then((results) => {
        this.setState({ gitHubProfile: results });
      });
    };

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUserName = sessionStorage.getItem('gitHubUserName');
        const currentUid = sessionStorage.getItem('uid');
        getAllItems();
        gitHubTest(currentUserName);
        this.setState({
          authed: true,
          gitHubUserName: currentUserName,
          uid: currentUid,
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

  isAuthenticated = (userName, currentUid) => {
    this.setState({
      authed: true,
      gitHubUserName: userName,
      uid: currentUid,
    });
    sessionStorage.setItem('gitHubUserName', userName);
    sessionStorage.setItem('uid', currentUid);
  }

  deleteOne = (tutorialId) => {
    const uid = authRequests.getCurrentUid();
    tutorialsRequest.deleteTutorial(tutorialId)
      .then(() => {
        tutorialsRequest.getTutorials(uid)
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  updateOneCheckbox = (tutorialId, isCompleted) => {
    const uid = authRequests.getCurrentUid();
    tutorialsRequest.updateIsCompleted(tutorialId, isCompleted)
      .then(() => {
        tutorialsRequest.getTutorials(uid).then((tutorials) => {
          this.setState({ tutorials });
        });
      });
  }

  formSubmitEvent = (newItem) => {
    const uid = authRequests.getCurrentUid();
    tutorialsRequest.postRequest(newItem).then(() => {
      tutorialsRequest.getTutorials(uid).then((tutorials) => {
        this.setState({ tutorials });
      });
    })
      .catch(err => console.error('error formSubmit', err));
  }

  render() {
    const {
      authed,
      gitHubUserName,
      gitHubProfile,
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
        gitHubUserName: '',
        gitHubProfile: '',
        uid: '',
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
          <Auth isAuthenticated={this.isAuthenticated} />
        </div>
      );
    }

    return (
      <div className="App">
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
        <div className="row justify-content-around">
          <div className="col-3">
            <Profile
              gitHubUserName={gitHubUserName}
              gitHubProfile={gitHubProfile}
            />
          </div>
          <div className="col-8">
            <PortalForm onSubmit={this.formSubmitEvent} />
            <Portal
              // items={items}
              tutorials={tutorials}
              resources={resources}
              podcasts={podcasts}
              blogs={blogs}
              activeTab={activeTab}
              tabView={this.tabView}
              deleteSingleTutorial={this.deleteOne}
              updateIsCompleted={this.updateOneCheckbox}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
