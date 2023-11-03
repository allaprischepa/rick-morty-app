import { NavLink } from 'react-router-dom';
import './Pager.scss';

interface IPagerProps {
  currentPage: number;
  pagesCount: number;
  pagerGap?: number;
}

function Pager({ currentPage, pagesCount, pagerGap = 0 }: IPagerProps) {
  if (pagesCount <= 0) return <></>;

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

    return <NavLink to={`../page/${pageNum}`} key="prev" className="prev" />;
  };

  const getNextPageLink = (): JSX.Element | null => {
    const pageNum =
      currentPage + 1 > pagesCount ? currentPage : currentPage + 1;

    return <NavLink to={`../page/${pageNum}`} key="next" className="next" />;
  };

  const pagerContent: JSX.Element[] = [];
  const frstPagePath = '../page/1';
  const lstPagePath = `../page/${pagesCount}`;
  const startPage = getStartPage();
  const endPage = getEndPage();
  const prevPage = getPrevPageLink();
  const nextPage = getNextPageLink();

  const firstPage = <NavLink to={frstPagePath} key="first" className="first" />;
  const lastPage = <NavLink to={lstPagePath} key="last" className="last" />;

  pagerContent.push(firstPage);
  if (prevPage) pagerContent.push(prevPage);

  for (let page = startPage; page <= endPage; page++) {
    pagerContent.push(
      <NavLink to={`../page/${page}`} key={`page-${page}`}>
        {page}
      </NavLink>
    );
  }

  if (nextPage) pagerContent.push(nextPage);
  pagerContent.push(lastPage);

  return pagerContent ? <div className="pager">{pagerContent}</div> : <></>;
}

export default Pager;
