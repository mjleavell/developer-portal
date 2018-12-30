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
import TutorialItem from '../TutorialItem/TutorialItem';
import ResourceItem from '../ResourceItem/ResourceItem';
import BlogsItem from '../BlogsItem/BlogsItem';
import PodcastItem from '../PodcastsItem/PodcastsItem';
import itemShape from '../../helpers/propz/itemShape';

class Portal extends React.Component {
  static propTypes = {
    deleteTutorial: PropTypes.func,
    tabView: PropTypes.func,
    // blogs: PropTypes.arrayOf(itemShape),
    // podcasts: PropTypes.arrayOf(itemShape),
    // tutorials: PropTypes.arrayOf(itemShape),
    // resources: PropTypes.arrayOf(itemShape),
  }

  // constructor(props) {
  //   super(props);

  //   tabView = tabView.bind(this);
  //   this.state = {
  //     activeTab: 'tutorials',
  //   };
  // }

  // toggle(tab) {
  //   if (activeTab !== tab) {
  //     this.setState({
  //       activeTab: tab,
  //     });
  //   }
  // }

  render() {
    const {
      tutorials,
      resources,
      blogs,
      podcasts,
      activeTab,
      tabView,
      deleteSingleTutorial,
    } = this.props;

    const tutorialItemComponents = tutorials.map(tutorial => (
      <TutorialItem
        tutorial={tutorial}
        key={tutorial.id}
        deleteSingleTutorial={deleteSingleTutorial}
      />
    ));

    const resourceItemComponent = resources.map(resource => (
      <ResourceItem
        resource={resource}
        key={resource.id}
      />
    ));

    const blogItemComponent = blogs.map(blog => (
      <BlogsItem
        blog={blog}
        key={blog.id}
      />
    ));

    const podcastItemComponent = podcasts.map(podcast => (
      <PodcastItem
        podcast={podcast}
        key={podcast.id}
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
          <TabContent activeTab={activeTab}>
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
