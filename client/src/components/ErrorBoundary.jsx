import { Component } from 'react';

import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    fallback: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
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

      return <Fallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
