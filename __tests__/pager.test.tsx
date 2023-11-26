import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TEST_ID as PAGER_TEST_ID } from '../src/components/Pager/Pager';
import userEvent from '@testing-library/user-event';
import MainPage, { getServerSideProps } from '../pages/page/[pageID]';
import { useRouter } from 'next/router';
import { gsspCtx } from './utils/utils';

describe('Pagination Сomponent:', () => {
  it('updates URL query parameter when page changes', async () => {
    const res = await getServerSideProps(gsspCtx({ resolvedUrl: 'page/1' }));

    render(<MainPage {...res.props} />);

    const { push, pathname } = useRouter();

    const pager = await screen.findByTestId(PAGER_TEST_ID);
    expect(pager).toBeInTheDocument();

    expect(pathname).toContain('page/1');

    const nextPage = screen.getByTitle('page 2');
    expect(nextPage).toBeInTheDocument();

    await userEvent.click(nextPage);

    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/page/2' }),
      '/page/2'
    );
  });
});
