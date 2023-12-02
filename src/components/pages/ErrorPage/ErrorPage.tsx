import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { HttpStatusCode } from '../../../utils/enums';

function ErrorPage() {
  const error = useRouteError();

  const pageReload = () => window.location.reload();

  const notFound = (): JSX.Element => {
    return (
      <div className="error-page">
        <div className="error-message">
          <div>Sorry... The page is not found.</div>
          <div>Please, go to Home page.</div>
        </div>
        <Link className="button home-link" to="/">
          Go Home
        </Link>
      </div>
    );
  };

  const someError = (): JSX.Element => {
    return (
      <div className="error-page">
        <div className="error-message">
          <div>Sorry... The error occurred.</div>
          <div>Please, try to reload page</div>
        </div>
        <button className="reload-button" onClick={pageReload}>
          Reload page
        </button>
      </div>
    );
  };

  return isRouteErrorResponse(error) &&
    error.status === HttpStatusCode.NOT_FOUND
    ? notFound()
    : someError();
}

export default ErrorPage;
