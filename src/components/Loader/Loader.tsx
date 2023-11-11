import './Loader.scss';

export const TEST_ID = 'loading';

function Loader() {
  return <div className="loading" data-testid={TEST_ID}></div>;
}

export default Loader;
