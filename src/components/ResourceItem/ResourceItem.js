import React from 'react';
import itemShape from '../../helpers/propz/itemShape';
import './ResourceItem.scss';

class ResourceItem extends React.Component {
  static propTypes = {
    resource: itemShape,
  }

  render() {
    const { resource } = this.props;
    return (
      <li className="resource-item">
        <span className="col-4">{resource.name}</span>
        <span className="col-6">{resource.url}</span>
        <span className="col-1">
          <button className="btn btn-danger">X</button>
        </span>
        <div className="col-1 form-check align-self-center">
          <input
            type="checkbox"
            className="form-check-input item-checkbox"
            id="resource-check"
            checked={resource.isCompleted}
          />
          <label className="form-check-label" htmlFor="resource-check">
            Done
          </label>
        </div>
      </li>
    );
  }
}

export default ResourceItem;
