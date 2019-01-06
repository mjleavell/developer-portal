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
import portalRequests from '../helpers/data/portalRequests';

class App extends Component {
  state = {
    authed: false,
    gitHubUserName: '',
    gitHubProfile: {},
    gitHubCommits: 0,
    activeTab: 'tutorials',
    tutorials: [],
    resources: [],
    blogs: [],
    podcasts: [],
  }


  componentDidMount() {
    connection();

    const gitHubUserInfo = (userName) => {
      gitHubRequests.getUserInfo(userName).then((results) => {
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
        this.getAllItems();
        gitHubUserInfo(currentUserName);
        gitHubUserCommits(currentUserName);
        this.setState({
          authed: true,
          gitHubUserName: currentUserName,
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
      gitHubProfile: userProfile,
    });
    sessionStorage.setItem('gitHubUserName', userName);
    sessionStorage.setItem('gitHubProfile', userProfile);
    this.getAllItems();
  }

  getAllItems = () => {
    const uid = authRequests.getCurrentUid();
    const sortPortal = items => items.sort((a, b) => a.isCompleted - b.isCompleted);
    portalRequests.getItems(uid).then((items) => {
      const blogs = [];
      const podcasts = [];
      const resources = [];
      const tutorials = [];
      items.forEach((item) => {
        if (item.type === 'blog') {
          blogs.push(item);
        } else if (item.type === 'podcast') {
          podcasts.push(item);
        } else if (item.type === 'resource') {
          resources.push(item);
        } else if (item.type === 'tutorial') {
          tutorials.push(item);
        }
      });
      sortPortal(blogs);
      sortPortal(podcasts);
      sortPortal(resources);
      sortPortal(tutorials);
      this.setState({
        blogs,
        podcasts,
        resources,
        tutorials,
      });
    });
  };

  deleteOne = (itemId) => {
    portalRequests.deleteOneItem(itemId).then(() => {
      this.getAllItems();
    })
      .catch(err => console.error('error with delete', err));
  }

  updateOneCheckbox = (itemId, isCompleted) => {
    portalRequests.updateIsCompleted(itemId, isCompleted).then(() => {
      this.getAllItems();
    })
      .catch(err => console.error('error update', err));
  }

  formSubmitEvent = (newItem) => {
    portalRequests.postRequest(newItem).then(() => {
      this.getAllItems();
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
          <div className="col-4 d-flex justify-content-center">
            <Profile
              gitHubUserName={gitHubUserName}
              gitHubProfile={gitHubProfile}
              gitHubCommits={gitHubCommits}
            />
          </div>
          <div className="col-7 portal-and-form">
            <PortalForm onSubmit={this.formSubmitEvent} />
            <Portal
              items={this.getAllItems}
              tutorials={tutorials}
              resources={resources}
              podcasts={podcasts}
              blogs={blogs}
              activeTab={activeTab}
              tabView={this.tabView}
              deleteSingleItem={this.deleteOne}
              updateIsCompleted={this.updateOneCheckbox}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
