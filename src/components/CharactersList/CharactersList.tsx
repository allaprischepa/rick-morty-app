import { useEffect, useState } from 'react';
import DataLoader from '../../services/dataLoader/dataLoader';
import { IAppProps, ICharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharactersList.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';
import Pager from '../Pager/Pager';
import { NavLink } from 'react-router-dom';
import Loader from '../Loader/Loader';

type Props = Pick<IAppProps, 'searchTerm' | 'page'>;
type CharactersData = ICharacterData[] | null;

function CharactersList({ searchTerm, page = 1 }: Props) {
  const [charactersData, setCharactersData] = useState<CharactersData>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const dataLoader = new DataLoader();

    const loadData = async (searchTerm: string, page: number | undefined) => {
      try {
        const data = await dataLoader.getData(searchTerm, page);

        setTimeout(() => {
          setCharactersData(data.results);
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
      <NavLink
        key={character.id}
        to={`./details/${character.id}`}
        className="card-link"
      >
        <CharacterCard {...character} />
      </NavLink>
    ));
  };

  return (
    <>
      {loader ? <Loader /> : null}
      <Pager currentPage={page} pagesCount={pagesCount} />
      <div className="characters-list">{showData(charactersData)}</div>
    </>
  );
}

export default CharactersList;
