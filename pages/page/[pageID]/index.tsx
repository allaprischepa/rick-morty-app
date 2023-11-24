import Content from '../../../src/components/Content/Content';
import { wrapper } from '../../../src/state/store';
import { serverSidePropsCallback } from '../../../src/utils/utils';

function MainPage() {
  return <Content />;
}

export default MainPage;

export const getServerSideProps = wrapper.getServerSideProps(
  serverSidePropsCallback
);
