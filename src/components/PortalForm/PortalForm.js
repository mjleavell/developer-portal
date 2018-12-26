import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './PortalForm.scss';

const defaultItem = {
  name: '',
  url: '',
  uid: '',
  type: '',
};

class PortalForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    newItem: defaultItem,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempItem = { ...this.state.newItem };
    tempItem[name] = e.target.value;
    this.setState({ newItem: tempItem });
  }

  render() {
    return (
      <div className="portal-form">
        <Form>
          <Form.Group
            id="formControlsText"
            type="text"
            label="Text"
            placeholder="Enter text"
          />
          <Form.Group
            id="formControlsEmail"
            type="email"
            label="Email address"
            placeholder="Enter email"
          />

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Radios
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="first radio"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="second radio"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="third radio"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default PortalForm;
