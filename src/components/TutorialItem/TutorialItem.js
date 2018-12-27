import React from 'react';
import itemShape from '../../helpers/propz/itemShape';
import './TutorialItem.scss';

class TutorialItem extends React.Component {
  static propTypes = {
    tutorial: itemShape,
  }

  render() {
    const { tutorial } = this.props;
    return (
      <li className="tutorial-item">
        <span className="col-4">{tutorial.name}</span>
        <span className="col-6">{tutorial.url}</span>
        <span className="col-1">
          <button className="btn btn-danger">X</button>
        </span>
        <div className="col-1 form-check align-self-center">
          <input
            type="checkbox"
            className="form-check-input"
            id="complete-check"
            checked={tutorial.isCompleted}
          />
          <label className="form-check-label" htmlFor="complete-check">
            Done
          </label>
        </div>
      </li>
    );
  }
}

export default TutorialItem;
