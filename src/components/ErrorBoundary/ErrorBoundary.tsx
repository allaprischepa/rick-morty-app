import { Component, ErrorInfo } from 'react';
import './ErrorBoundary.scss';
import { IProps } from '../../types/types';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  pageReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-message">
            <div>Sorry... The error occurred.</div>
            <div>Please, try to reload page.</div>
          </div>
          <button className="reload-button" onClick={this.pageReload}>
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
