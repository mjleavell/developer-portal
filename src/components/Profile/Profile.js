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
    gitHubCommits: PropTypes.number,
  };

  render() {
    const { gitHubProfile, gitHubCommits } = this.props;
    return (
      <div id="profile">
        <Card id="profile-card">
          <CardImg top id="profile-img" src={gitHubProfile.avatar_url} alt={gitHubProfile.login} />
          <CardBody>
            <CardTitle id="username">{gitHubProfile.login}</CardTitle>
            <CardSubtitle className="mb-1">{gitHubProfile.bio}</CardSubtitle>
            <CardLink href={gitHubProfile.html_url} className="text-body">Link to GitHub Profile</CardLink>
            <CardText id="commit-count" >{gitHubCommits}</CardText>
            <CardText id="commit-title">commits</CardText>
            <CardText id="commit-text">in the last 5 days</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Profile;
