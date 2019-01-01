import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
} from 'reactstrap';
import './Profile.scss';

// username, avatar, bio, url, and the number of commits
class Profile extends React.Component {
  static propTypes = {
    gitHubProfile: PropTypes.object,
  };

  render() {
    const { gitHubProfile } = this.props;
    return (
      <div id="profile">
        <Card>
          <CardImg top id="profile-img" src={gitHubProfile.avatar_url} alt="" />
          <CardBody>
            <CardTitle>{gitHubProfile.login}</CardTitle>
            <CardSubtitle><strong>Location: </strong>{gitHubProfile.location}</CardSubtitle>
            <CardText><strong>Commits: </strong>{gitHubProfile.bio}</CardText>
            <CardLink href={gitHubProfile.html_url}>Link to GitHub Profile</CardLink>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Profile;
