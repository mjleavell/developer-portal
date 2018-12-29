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
import TutorialItem from '../TutorialItem/TutorialItem';
import ResourceItem from '../ResourceItem/ResourceItem';
import BlogsItem from '../BlogsItem/BlogsItem';
import PodcastItem from '../PodcastsItem/PodcastsItem';

class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'tutorials',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      tutorials,
      resources,
      blogs,
      podcasts,
    } = this.props;

    const tutorialItemComponents = tutorials.map(tutorial => (
      <TutorialItem
        tutorial={tutorial}
        key={tutorial.id}
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
              className={classnames({ active: this.state.activeTab === 'tutorials' })}
              onClick={() => { this.toggle('tutorials'); }}
            >
            Tutorials
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="blogs"
              className={classnames({ active: this.state.activeTab === 'blogs' })}
              onClick={() => { this.toggle('blogs'); }}
            >
            Blogs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="resources"
              className={classnames({ active: this.state.activeTab === 'resources' })}
              onClick={() => { this.toggle('resources'); }}
            >
            Resources
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="podcasts"
              className={classnames({ active: this.state.activeTab === 'podcasts' })}
              onClick={() => { this.toggle('podcasts'); }}
            >
            Podcasts
            </NavLink>
          </NavItem>
        </Nav>
        <div className="portal-content">
          <TabContent activeTab={this.state.activeTab}>
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
