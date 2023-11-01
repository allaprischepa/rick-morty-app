import { Component, ErrorInfo } from 'react';
import { IProps } from '../../types/types';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

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

  render() {
    return this.state.hasError ? <ErrorPage /> : this.props.children;
  }
}

export default ErrorBoundary;
