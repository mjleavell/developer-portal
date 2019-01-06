import React from 'react';
import PropTypes from 'prop-types';
import itemShape from '../../helpers/propz/itemShape';
import './PortalItem.scss';

class PortalItem extends React.Component {
  static propTypes = {
    blog: itemShape,
    podcast: itemShape,
    resource: itemShape,
    tutorial: itemShape,
    deleteSingleItem: PropTypes.func,
    updateIsCompleted: PropTypes.func,
  }

  getItemType = () => {
    if (this.props.blog) {
      return this.props.blog;
    }
    if (this.props.podcast) {
      return this.props.podcast;
    }
    if (this.props.resource) {
      return this.props.resource;
    }
    if (this.props.tutorial) {
      return this.props.tutorial;
    }
    return null;
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const item = this.getItemType();
    const { deleteSingleItem } = this.props;
    deleteSingleItem(item.id);
  }

  updateEvent = (e) => {
    e.preventDefault();
    const item = this.getItemType();
    const { updateIsCompleted } = this.props;
    const isCompleted = e.target.checked;
    updateIsCompleted(item.id, isCompleted);
  }

  render() {
    const item = this.getItemType();
    return (
      <li className="portal-item">
        <span className="col-md-4">{item.name}</span>
        <span className="col-md-6">{item.url}</span>
        <span className="col-md-1 align-self-center justify-content-center">
          <button className="btn btn-danger" onClick={this.deleteEvent}>X</button>
        </span>
        <div className="col-md-1 form-check align-self-center justify-content-center">
          <input
            type="checkbox"
            className="form-check-input item-checkbox"
            id="portal-check"
            checked={item.isCompleted}
            onChange={this.updateEvent}
          />
          <label className="form-check-label" htmlFor="portal-check">
            Done
          </label>
        </div>
      </li>
    );
  }
}

export default PortalItem;
