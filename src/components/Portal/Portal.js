import React from 'react';
import './Portal.scss';
import classnames from 'classnames';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import PropTypes from 'prop-types';
import PortalItem from '../PortalItem/PortalItem';

class Portal extends React.Component {
  static propTypes = {
    deleteSingleItem: PropTypes.func,
    updateIsCompleted: PropTypes.func,
    tabView: PropTypes.func,
  }

  render() {
    const {
      tutorials,
      resources,
      blogs,
      podcasts,
      activeTab,
      tabView,
      deleteSingleItem,
      updateIsCompleted,
    } = this.props;

    const tutorialItemComponents = tutorials.map(tutorial => (
      <PortalItem
        tutorial={tutorial}
        key={tutorial.id}
        deleteSingleItem={deleteSingleItem}
        updateIsCompleted={updateIsCompleted}
      />
    ));

    const resourceItemComponent = resources.map(resource => (
      <PortalItem
        resource={resource}
        key={resource.id}
        deleteSingleItem={deleteSingleItem}
        updateIsCompleted={updateIsCompleted}
      />
    ));

    const blogItemComponent = blogs.map(blog => (
      <PortalItem
        blog={blog}
        key={blog.id}
        deleteSingleItem={deleteSingleItem}
        updateIsCompleted={updateIsCompleted}
      />
    ));

    const podcastItemComponent = podcasts.map(podcast => (
      <PortalItem
        podcast={podcast}
        key={podcast.id}
        deleteSingleItem={deleteSingleItem}
        updateIsCompleted={updateIsCompleted}
      />
    ));

    return (
      <div className="portal">
        <Nav tabs color="light">
          <NavItem>
            <NavLink
              id="tutorials"
              className={classnames({ active: activeTab === 'tutorials' })}
              onClick={() => { tabView('tutorials'); }}
            >
              Tutorials
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="blogs"
              className={classnames({ active: activeTab === 'blogs' })}
              onClick={() => { tabView('blogs'); }}
            >
              Blogs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="resources"
              className={classnames({ active: activeTab === 'resources' })}
              onClick={() => { tabView('resources'); }}
            >
              Resources
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="podcasts"
              className={classnames({ active: activeTab === 'podcasts' })}
              onClick={() => { tabView('podcasts'); }}
            >
              Podcasts
            </NavLink>
          </NavItem>
        </Nav>
        <div className="portal-content">
          <TabContent activeTab={activeTab} data={tutorials}>
            <TabPane tabId="tutorials">
              {tutorialItemComponents}
            </TabPane>
            <TabPane tabId="blogs">
              {blogItemComponent}
            </TabPane>
            <TabPane tabId="resources">
              {resourceItemComponent}
            </TabPane>
            <TabPane tabId="podcasts">
              {podcastItemComponent}
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Portal;
