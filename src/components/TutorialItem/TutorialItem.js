import React from 'react';
import PropTypes from 'prop-types';
import itemShape from '../../helpers/propz/itemShape';
import './TutorialItem.scss';

class TutorialItem extends React.Component {
  static propTypes = {
    tutorial: itemShape,
    deleteSingleTutorial: PropTypes.func,
    updateIsCompleted: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleTutorial, tutorial } = this.props;
    deleteSingleTutorial(tutorial.id);
  }

  updateEvent = (e) => {
    e.preventDefault();
    const { updateIsCompleted, tutorial } = this.props;
    const isCompleted = e.target.checked;
    updateIsCompleted(tutorial.id, isCompleted);
  }

  render() {
    const { tutorial } = this.props;
    return (
      <li className="tutorial-item">
        <span className="col-md-4">{tutorial.name}</span>
        <span className="col-md-6">{tutorial.url}</span>
        <span className="col-md-1">
          <button className="btn btn-danger" onClick={this.deleteEvent}>X</button>
        </span>
        <div className="col-md-1 form-check align-self-center">
          <input
            type="checkbox"
            className="form-check-input item-checkbox"
            id="tutorial-check"
            checked={tutorial.isCompleted}
            onChange={this.updateEvent}
          />
          <label className="form-check-label" htmlFor="tutorial-check">
            Done
          </label>
        </div>
      </li>
    );
  }
}

export default TutorialItem;
