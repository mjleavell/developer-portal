import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';

import './PortalNav.scss';

class PortalNav extends React.Component {
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

  portalTabEvent = (e) => {
    e.preventDefault();

  }

  render() {
    return (
      <div className="portal-navbar">
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
              className={classnames({ active: this.state.activeTab === 'tutorials' })}
              onClick={}
            >
            Blogs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="resources"
              className={classnames({ active: this.state.activeTab === 'tutorials' })}
              onClick={}
            >
            Resources
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="podcasts"
              className={classnames({ active: this.state.activeTab === 'tutorials' })}
              onClick={}
            >
            Podcasts
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default PortalNav;
