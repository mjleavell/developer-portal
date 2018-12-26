import React from 'react';
import './Portal.scss';
import { Card } from 'reactstrap';
import PortalNav from '../PortalNav/PortalNav';

class Portal extends React.Component {
  render() {
    return (
      <div className="portal">
        <Card body outline color="secondary" className="p-0">
          <PortalNav />
          <div className="portal-output">
          </div>
        </Card>
      </div>
    );
  }
}

export default Portal;
