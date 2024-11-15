import { AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Error({ error }) {
  return (
    <section className="flex flex-col items-center justify-center gap-6 mt-5">
      <AlertTriangle className="text-error" size="6em" />

      <h1 className="text-5xl text-error">{error.status}</h1>
      <p className="text-2xl leading-4">{error.message}</p>

      <button
        onClick={() => window.location.reload()}
        className="text-white border-none btn btn-primary hover:opacity-90"
      >
        Reload the page
      </button>
    </section>
  );
}

Error.propTypes = {
  error: PropTypes.exact({
    status: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
};
