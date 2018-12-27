import PropTypes from 'prop-types';

const itemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool.isRequired,
});

export default itemShape;
