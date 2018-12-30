import React from 'react';
import PropTypes from 'prop-types';
import itemShape from '../../helpers/propz/itemShape';
import './PortalItem.scss';

class PortalItem extends React.Component {
  static propTypes = {
    item: itemShape,
    deleteSingleTutorial: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleTutorial, tutorial } = this.props;
    deleteSingleTutorial(tutorial.id, tutorial.type);
  }

  render() {
    const { item } = this.props;
    return (
      <li className="portal-item">
        <span className="col-md-4">{item.name}</span>
        <span className="col-md-6">{item.url}</span>
        <span className="col-md-1">
          <button className="btn btn-danger" onClick={this.deleteEvent}>X</button>
        </span>
        <div className="col-md-1 form-check align-self-center">
          <input
            type="checkbox"
            className="form-check-input item-checkbox"
            id="tutorial-check"
            checked={item.isCompleted}
          />
          <label className="form-check-label" htmlFor="tutorial-check">
            Done
          </label>
        </div>
      </li>
    );
  }
}

export default PortalItem;
