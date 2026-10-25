import PropTypes from 'prop-types';

export default function Alert({ message }) {
  return message ? <p role="alert" className="mt-4 font-semibold">{message}</p> : null;
}

Alert.propTypes = { message: PropTypes.string };
