import React from 'react';
import itemShape from '../../helpers/propz/itemShape';
import './PodcastsItem.scss';

class PodcastItem extends React.Component {
  static propTypes = {
    podcast: itemShape,
  }

  render() {
    const { podcast } = this.props;
    return (
      <li className="podcast-item">
        <span className="col-md-4">{podcast.name}</span>
        <span className="col-md-6">{podcast.url}</span>
        <span className="col-md-1">
          <button className="btn btn-danger">X</button>
        </span>
        <div className="col-md-1 form-check align-self-center">
          <input
            type="checkbox"
            className="form-check-input item-checkbox"
            id="podcast-check"
            // checked={podcast.isCompleted}
          />
          <label className="form-check-label" htmlFor="podcast-check">
            Done
          </label>
        </div>
      </li>
    );
  }
}

export default PodcastItem;
