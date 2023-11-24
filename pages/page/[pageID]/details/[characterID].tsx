import Content from '../../../../src/components/Content/Content';
import { wrapper } from '../../../../src/state/store';
import { serverSidePropsCallback } from '../../../../src/utils/utils';

function DetailsPage() {
  return <Content />;
}

export default DetailsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  serverSidePropsCallback
);
