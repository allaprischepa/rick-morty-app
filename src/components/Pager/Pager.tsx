import './Pager.scss';
import { useContext } from 'react';
import { MainPageContext } from '../pages/MainPage/MainPage';

interface Props {
  pagerGap?: number;
}

function Pager({ pagerGap = 0 }: Props) {
  const {
    page: currentPage,
    pagesCount,
    goToPage,
  } = useContext(MainPageContext);

  if (pagesCount <= 0) return <></>;

  const getLink = (
    pageNum: number,
    key: string,
    className?: string,
    content?: string
  ): JSX.Element => {
    if (pageNum === currentPage) className = `${className} active`;

    return (
      <button
        className={className}
        key={key}
        title={`page ${pageNum}`}
        onClick={() => goToPage(pageNum)}
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

  return pagerContent ? <div className="pager">{pagerContent}</div> : <></>;
}

export default Pager;
