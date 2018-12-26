import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './PortalNav.scss';

class PortalNav extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <div className="portal-navbar">
        <Nav tabs color="light" light>
          <NavItem>
            <NavLink
              id="tutorials"
            >
            Tutorials
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="blogs"
            >
            Blogs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="resources"
            >
            Resources
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="podcasts"
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
