import { GetServerSidePropsContext } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';

export const gsspCtx = (
  ctx?: Partial<GetServerSidePropsContext>
): GetServerSidePropsContext => ({
  req: createRequest(),
  res: createResponse(),
  params: undefined,
  query: {},
  resolvedUrl: '/',
  ...ctx,
});
