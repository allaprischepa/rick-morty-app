import { useRouter } from 'next/router';
import styles from './Pager.module.scss';

export const TEST_ID = 'pager';

interface Props {
  currentPage: number;
  pagesCount: number;
  pagerGap?: number;
}

function Pager({ currentPage, pagesCount, pagerGap = 0 }: Props) {
  const router = useRouter();

  if (pagesCount <= 0) return <></>;

  const getLink = (
    pageNum: number,
    key: string,
    className?: string,
    content?: string
  ): JSX.Element => {
    className =
      pageNum === currentPage
        ? `${styles[className]} ${styles.active}`
        : styles[className];

    return (
      <button
        className={className}
        key={key}
        title={`page ${pageNum}`}
        onClick={() =>
          router.push(
            {
              pathname: `/page/${pageNum}`,
              query: { ...router.query },
            },
            `/page/${pageNum}`
          )
        }
      >
        {content}
      </button>
    );
  };

  const getStartPage = () => {
    let startPage = currentPage - pagerGap;
    startPage = startPage > 1 ? startPage : 1;

    return startPage;
  };

  const getEndPage = () => {
    let endPage = currentPage + pagerGap;
    endPage = endPage < pagesCount ? endPage : pagesCount;

    return endPage;
  };

  const getPrevPageLink = (): JSX.Element | null => {
    const pageNum = currentPage - 1 <= 0 ? currentPage : currentPage - 1;

    return getLink(pageNum, 'prev', 'prev');
  };

  const getNextPageLink = (): JSX.Element | null => {
    const pageNum =
      currentPage + 1 > pagesCount ? currentPage : currentPage + 1;

    return getLink(pageNum, 'next', 'next');
  };

  const pagerContent: JSX.Element[] = [];
  const startPage = getStartPage();
  const endPage = getEndPage();
  const prevPage = getPrevPageLink();
  const nextPage = getNextPageLink();
  const firstPage = getLink(1, 'first', 'first');
  const lastPage = getLink(pagesCount, 'last', 'last');

  pagerContent.push(firstPage);
  if (prevPage) pagerContent.push(prevPage);

  for (let page = startPage; page <= endPage; page++) {
    pagerContent.push(getLink(page, `page-${page}`, '', `${page}`));
  }

  if (nextPage) pagerContent.push(nextPage);
  pagerContent.push(lastPage);

  return pagerContent ? (
    <div className={styles.pager} data-testid={TEST_ID}>
      {pagerContent}
    </div>
  ) : null;
}

export default Pager;
