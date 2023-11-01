import { useEffect, useState } from 'react';
import DataLoader from '../../services/dataLoader/dataLoader';
import { IAppProps, ICharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharactersList.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';
import { Link } from 'react-router-dom';

type Props = Pick<IAppProps, 'searchTerm' | 'page'>;
type CharactersData = ICharacterData[] | null;

function CharactersList({ searchTerm, page = 1 }: Props) {
  const [characterData, setCharacterData] = useState<CharactersData>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const dataLoader = new DataLoader();

    const loadData = async (searchTerm: string, page: number | undefined) => {
      try {
        const data = await dataLoader.getData(searchTerm, page);

        setTimeout(() => {
          setCharacterData(data.results);
          setPagesCount(data.pages);
          setLoader(false);
        }, 250);
      } catch (err) {
        console.error(err);
        setLoader(false);
      }
    };

    setLoader(true);
    loadData(searchTerm, page);
  }, [searchTerm, page]);

  const showData = (data: CharactersData): JSX.Element | JSX.Element[] => {
    if (data === null) return <></>;
    if (!data.length) return <NotFoundCard />;

    return data.map((character: ICharacterData) => (
      <CharacterCard key={character.id} {...character} />
    ));
  };

  const pagerElement = (
    currentPage: number,
    pagesCount: number
  ): JSX.Element | JSX.Element[] => {
    if (pagesCount <= 0) return <></>;

    const pagerContent: JSX.Element[] = [];
    let startPage = currentPage - 5;
    startPage = startPage > 1 ? startPage : 1;
    let endPage = currentPage + 5;
    endPage = endPage < pagesCount ? endPage : pagesCount;
    const firstPage = (
      <Link to={`.?page=1`} key="first">
        {'<<'}
      </Link>
    );
    const lastPage = (
      <Link to={`.?page=${pagesCount}`} key="last">
        {'>>'}
      </Link>
    );

    pagerContent.push(firstPage);
    for (let page = startPage; page <= endPage; page++) {
      pagerContent.push(
        <Link to={`.?page=${page}`} key={`${page}`}>
          {page}
        </Link>
      );
    }
    pagerContent.push(lastPage);

    return pagerContent ? <div className="pager">{pagerContent}</div> : <></>;
  };

  return (
    <>
      {loader ? <div className="loading"></div> : null}
      <div className="characters-list">{showData(characterData)}</div>
      {pagerElement(page, pagesCount)}
    </>
  );
}

export default CharactersList;
