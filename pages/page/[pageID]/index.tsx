import Content from '../../../src/components/Content/Content';
import { wrapper } from '../../../src/state/store';
import { serverSidePropsCallback } from '../../../src/utils/utils';

function MainPage(props) {
  return <Content props={props} />;
}

export default MainPage;

export const getServerSideProps = wrapper.getServerSideProps(
  serverSidePropsCallback
);
