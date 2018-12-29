import React from 'react';
import './PortalForm.scss';

class PortalForm extends React.Component {
  render() {
    return (
      <div className="portal-form">
        <h2 className="mt-2">Add new item</h2>
        <form>
          <div className="form-group row">
            <div className="col-7 p-0 m-2">
              <label htmlFor="form-name" className="mt-1">Name:</label>
              <input
                type="text"
                className="form-control"
                id="form-name"
                aria-describedby="textHelp"
                placeholder="Enter name"
                // onChange={this.handleName}
              />
              <label htmlFor="form-link" className="mt-1">Link:</label>
              <input
                type="text"
                className="form-control"
                id="form-url"
                aria-describedby="textHelp"
                placeholder="Enter url"
                // onChange={this.handleUrl}
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
                  // onChange={this.handleRadioBtn}
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
                  // onChange={this.handleRadioBtn}
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
                  // onChange={this.handleRadioBtn}
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
                  // onChange={this.handleRadioBtn}
                />
                <label className="form-check-label" htmlFor="radio-podcast">Podcast</label>
              </div>
            </div>
            <div className="form-group col-1 m-1 align-self-center">
              <button
                type="submit"
                className="btn btn-outline-secondary"
                id="submit-btn"
                // onSubmit={this.handleFormSubmit}
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
