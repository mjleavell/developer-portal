import React from 'react';
import './Portal.scss';
import { Card } from 'reactstrap';
import PortalNav from '../PortalNav/PortalNav';
import TutorialItem from '../TutorialItem/TutorialItem';

class Portal extends React.Component {
  render() {
    const { tutorials } = this.props;

    const tutorialItemComponents = tutorials.map(tutorial => (
      <TutorialItem
        tutorial={tutorial}
        key={tutorial.id}
      />
    ));

    return (
      <div className="portal">
        <Card body outline color="secondary" className="p-0">
          <PortalNav />
          <div className="portal-output p-1">
            {tutorialItemComponents}
          </div>
        </Card>
      </div>
    );
  }
}

export default Portal;
