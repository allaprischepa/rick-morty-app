import { useState } from 'react';
import './ErrorButton.scss';

function ErrorButton() {
  const [error, setError] = useState(false);

  if (error) throw new Error('An error occurred on button click');

  return (
    <button className="error-button" onClick={() => setError(true)}>
      Click me to show the error
    </button>
  );
}

export default ErrorButton;
