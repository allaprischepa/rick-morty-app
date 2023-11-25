import ErrorPage from '../src/components/pages/ErrorPage/ErrorPage';
import NotFoundPage from '../src/components/pages/NotFoundPage/NotFoundPage';

const HTTP_STATUS_NOT_FOUND = 404;

function Error({ statusCode }) {
  return statusCode === HTTP_STATUS_NOT_FOUND ? (
    <NotFoundPage />
  ) : (
    <ErrorPage />
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res
    ? res.statusCode
    : err
    ? err.statusCode
    : HTTP_STATUS_NOT_FOUND;
  return { statusCode };
};

export default Error;
