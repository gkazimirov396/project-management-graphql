import { Component, createElement } from 'react';

import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
      PropTypes.instanceOf(Component),
    ]).isRequired,
  };

  state = { hasError: false, error: null };

  static getDerivedStateFromError(originalError) {
    const newState = { hasError: true };

    if (originalError instanceof Error) {
      newState.error = { status: 500, message: originalError.message };
    } else {
      const message =
        typeof originalError === 'string'
          ? originalError
          : 'Something went wrong.';

      newState.error = { status: 500, message };
    }

    return newState;
  }

  render() {
    if (this.state.hasError && this.state.error !== null) {
      const Fallback = this.props.fallback;

      return createElement(Fallback, { error: this.state.error });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
