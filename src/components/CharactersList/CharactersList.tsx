import { useEffect, useState } from 'react';
import DataLoader from '../../services/dataLoader/dataLoader';
import { IAppProps, ICharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharactersList.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';
import Pager from '../Pager/Pager';

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

  return (
    <>
      {loader ? <div className="loading"></div> : null}
      <Pager currentPage={page} pagesCount={pagesCount} />
      <div className="characters-list">{showData(characterData)}</div>
    </>
  );
}

export default CharactersList;
