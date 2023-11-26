import { AppProps } from 'next/app';
import { wrapper } from '../src/state/store';
import '../src/styles/index.scss';
import Layout from '../src/components/Layout/Layout';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <ErrorBoundary>
          <Component {...props.pageProps} />
        </ErrorBoundary>
      </Layout>
    </Provider>
  );
}

export default App;
