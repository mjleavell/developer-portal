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
    gitHubProfile: {},
    gitHubCommits: 0,
    uid: '',
    activeTab: 'tutorials',
    tutorials: [],
    resources: [],
    blogs: [],
    podcasts: [],
  }


  componentDidMount() {
    connection();

    // gitHubTest = (userName) => {
    //   gitHubRequests.getGithubUser(userName).then((results) => {
    //     this.setState({ gitHubProfile: results });
    //   })
    //     .catch(err => console.error('error in githubTest', err));
    // };
    // const sortPortalItems = (first, second) => first.isCompleted - second.isCompleted;

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

    const gitHubUserInfo = (userName) => {
      gitHubRequests.getUserInfo(userName).then((results) => {
        console.log(results);
        this.setState({ gitHubProfile: results });
      })
        .catch(err => console.error('error in githubuser', err));
    };

    const gitHubUserCommits = (userName) => {
      gitHubRequests.getCommits(userName).then((result) => {
        this.setState({ gitHubCommits: result });
      })
        .catch(err => console.error(err));
    };

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUserName = sessionStorage.getItem('gitHubUserName');
        const currentUid = sessionStorage.getItem('uid');
        // const userProfile = sessionStorage.getItem('gitHubProfile');
        // const userObject = JSON.parse(userProfile);
        getAllItems();
        gitHubUserInfo(currentUserName);
        gitHubUserCommits(currentUserName);
        this.setState({
          authed: true,
          gitHubUserName: currentUserName,
          uid: currentUid,
          // dk why i dont need profile here
          // gitHubProfile: userObject,
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

  isAuthenticated = (userName, currentUid, userProfile) => {
    this.setState({
      authed: true,
      gitHubUserName: userName,
      uid: currentUid,
      gitHubProfile: userProfile,
    });
    sessionStorage.setItem('gitHubUserName', userName);
    sessionStorage.setItem('uid', currentUid);
    sessionStorage.setItem('gitHubProfile', userProfile);
    // this.getAllItems();
    // this.gitHubUserInfo(userName);
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
      gitHubCommits,
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
        gitHubProfile: {},
        gitHubCommits: 0,
        uid: '',
        tutorials: [],
        resources: [],
        blogs: [],
        podcasts: [],
      });
    };

    if (!authed) {
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
              gitHubCommits={gitHubCommits}
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
