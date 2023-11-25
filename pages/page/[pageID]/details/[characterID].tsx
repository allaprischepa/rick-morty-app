import { AppProps } from 'next/app';
import Content from '../../../../src/components/Content/Content';
import { wrapper } from '../../../../src/state/store';
import { serverSidePropsCallback } from '../../../../src/utils/utils';

function DetailsPage(props: AppProps) {
  return <Content props={props} />;
}

export default DetailsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  serverSidePropsCallback
);
