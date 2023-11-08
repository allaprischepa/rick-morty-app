import { NavLink } from 'react-router-dom';
import './Pager.scss';
import { useContext } from 'react';
import { MainPageContext } from '../pages/MainPage/MainPage';

interface Props {
  pagerGap?: number;
}

function Pager({ pagerGap = 0 }: Props) {
  const { page: currentPage, pagesCount } = useContext(MainPageContext);
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

    return (
      <NavLink
        to={`../${pageNum}`}
        relative="path"
        key="prev"
        className="prev"
      />
    );
  };

  const getNextPageLink = (): JSX.Element | null => {
    const pageNum =
      currentPage + 1 > pagesCount ? currentPage : currentPage + 1;

    return (
      <NavLink
        to={`../${pageNum}`}
        relative="path"
        key="next"
        className="next"
      />
    );
  };

  const pagerContent: JSX.Element[] = [];
  const startPage = getStartPage();
  const endPage = getEndPage();
  const prevPage = getPrevPageLink();
  const nextPage = getNextPageLink();

  const firstPage = (
    <NavLink to="../1" relative="path" key="first" className="first" />
  );
  const lastPage = (
    <NavLink
      to={`../${pagesCount}`}
      relative="path"
      key="last"
      className="last"
    />
  );

  pagerContent.push(firstPage);
  if (prevPage) pagerContent.push(prevPage);

  for (let page = startPage; page <= endPage; page++) {
    pagerContent.push(
      <NavLink to={`../${page}`} relative="path" key={`page-${page}`}>
        {page}
      </NavLink>
    );
  }

  if (nextPage) pagerContent.push(nextPage);
  pagerContent.push(lastPage);

  return pagerContent ? <div className="pager">{pagerContent}</div> : <></>;
}

export default Pager;
