import { Component, ReactNode } from 'react';
import './ErrorButton.scss';

interface Props {
  children?: ReactNode;
}

interface State {
  error: boolean;
}

class ErrorButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: false };
  }

  handleClick() {
    this.setState({ error: !this.state.error });
  }

  render() {
    if (this.state.error) throw new Error('An error occurred on button click');

    const buttonText = 'Click me to show the error';
    return (
      <button className="error-button" onClick={() => this.handleClick()}>
        {buttonText}
      </button>
    );
  }
}

export default ErrorButton;
