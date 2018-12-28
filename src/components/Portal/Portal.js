import React from 'react';
import './Portal.scss';
import { Card } from 'reactstrap';
import PortalNav from '../PortalNav/PortalNav';
import TutorialItem from '../TutorialItem/TutorialItem';
import ResourceItem from '../ResourceItem/ResourceItem';
import BlogItem from '../BlogsItem/BlogsItem';
import PodcastItem from '../PodcastsItem/PodcastsItem';

class Portal extends React.Component {
  render() {
    const { tutorials, resources } = this.props;

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

    const blogItemComponent = resources.map(blog => (
      <BlogItem
        blog={blog}
        key={blog.id}
      />
    ));

    const podcastItemComponent = resources.map(podcast => (
      <PodcastItem
        podcast={podcast}
        key={podcast.id}
      />
    ));

    return (
      <div className="portal">
        <Card body outline color="secondary" className="p-0">
          <PortalNav />
          <div className="portal-output p-1">
            {tutorialItemComponents}
            {resourceItemComponent}
            {blogItemComponent}
            {podcastItemComponent}
          </div>
        </Card>
      </div>
    );
  }
}

export default Portal;
