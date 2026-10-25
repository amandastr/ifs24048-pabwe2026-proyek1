import PropTypes from 'prop-types';
import Alert from './Alert.jsx';
import EmptyState from './EmptyState.jsx';
import Loading from './Loading.jsx';

// Satu tempat untuk tampilan loading, error, dan data kosong.
export default function AsyncState({ loading, error, isEmpty = false, emptyMessage = '' }) {
  if (loading) return <Loading />;
  if (error) return <Alert message={error} />;
  return isEmpty ? <EmptyState message={emptyMessage} /> : null;
}

AsyncState.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  isEmpty: PropTypes.bool,
  emptyMessage: PropTypes.string,
};
