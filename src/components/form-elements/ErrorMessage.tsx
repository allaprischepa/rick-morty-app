interface Props {
  errors: string[];
}

function ErrorMessage({ errors }: Props) {
  return (
    <div className="errors">
      {errors.map((error, key) => (
        <div className="error-msg" key={key}>
          {error}
        </div>
      ))}
    </div>
  );
}

export default ErrorMessage;
