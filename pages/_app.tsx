import { AppProps } from 'next/app';
import { wrapper } from '../src/state/store';
import '../src/styles/index.scss';
import Layout from '../src/components/Layout/Layout';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Layout>
  );
}

export default wrapper.withRedux(App);
