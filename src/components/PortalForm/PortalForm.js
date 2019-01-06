import React from 'react';
import PropTypes from 'prop-types';
import './PortalForm.scss';
import authRequests from '../../helpers/data/authRequests';

const defaultItem = {
  name: '',
  type: '',
  url: '',
  uid: '',
  isCompleted: false,
};

class PortalForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    newItem: defaultItem,
    radioBtnSelected: false,
  }

  formFieldStringState = (value, e) => {
    e.preventDefault();
    const tempItem = { ...this.state.newItem };
    tempItem[value] = e.target.value;
    this.setState({ newItem: tempItem });
  }

  handleName = e => this.formFieldStringState('name', e);

  handleUrl = e => this.formFieldStringState('url', e);

  handleRadioType = (e) => {
    this.setState({ radioBtnSelected: e.target.value });
    this.formFieldStringState('type', e);
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myItem = { ...this.state.newItem };
    myItem.uid = authRequests.getCurrentUid();
    onSubmit(myItem);
    this.setState({ newItem: defaultItem });
  }

  render() {
    const {
      newItem,
      radioBtnSelected,
    } = this.state;

    return (
      <div className="portal-form">
        <h2 className="mt-2">Add new item</h2>
        <form onSubmit={this.formSubmit}>
          <div className="form-group row">
            <div className="col-7 p-0 m-2">
              <label htmlFor="name" className="mt-1">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="textHelp"
                placeholder="Enter name"
                value={newItem.name}
                onChange={this.handleName}
              />
              <label htmlFor="url" className="mt-1">Link:</label>
              <input
                type="text"
                className="form-control"
                id="url"
                aria-describedby="textHelp"
                placeholder="Enter url"
                value={newItem.url}
                onChange={this.handleUrl}
              />
            </div>
            <div className="form-group col-3 my-5 ml-2 align-self-center text-left">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="form-radio"
                  id="radio-tutorial"
                  value="tutorial"
                  checked={radioBtnSelected === 'tutorial'}
                  onChange={this.handleRadioType}
                />
                <label className="form-check-label" htmlFor="radio-tutorial">Tutorial</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="form-radio"
                  id="radio-blog"
                  value="blog"
                  checked={radioBtnSelected === 'blog'}
                  onChange={this.handleRadioType}
                />
                <label className="form-check-label" htmlFor="radio-blog">Blog</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="form-radio"
                  id="radio-resource"
                  value="resource"
                  checked={radioBtnSelected === 'resource'}
                  onChange={this.handleRadioType}
                />
                <label className="form-check-label" htmlFor="radio-resource">Resource</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="form-radio"
                  id="radio-podcast"
                  value="podcast"
                  checked={radioBtnSelected === 'podcast'}
                  onChange={this.handleRadioType}
                />
                <label className="form-check-label" htmlFor="radio-podcast">Podcast</label>
              </div>
            </div>
            <div className="form-group col-1 m-1 align-self-center">
              <button
                type="submit"
                className="btn btn-outline-secondary"
                id="submit-btn"
              >
              Add
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PortalForm;
