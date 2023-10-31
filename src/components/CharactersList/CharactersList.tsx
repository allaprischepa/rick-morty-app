import { useEffect, useState } from 'react';
import DataLoader from '../../services/dataLoader/dataLoader';
import { IAppProps, ICharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharactersList.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';

type Props = Pick<IAppProps, 'searchTerm'>;
type CharacterData = ICharacterData[] | null;

function CharactersList({ searchTerm }: Props) {
  const [characterData, setCharacterData] = useState<CharacterData>(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const dataLoader = new DataLoader();

    const loadData = async (searchTerm: string) => {
      try {
        const data = await dataLoader.getData(searchTerm);

        setTimeout(() => {
          setCharacterData(data);
          setLoader(false);
        }, 250);
      } catch (err) {
        console.error(err);
        setLoader(false);
      }
    };

    setLoader(true);
    loadData(searchTerm);
  }, [searchTerm]);

  const showData = (data: CharacterData): JSX.Element | JSX.Element[] => {
    if (data === null) return <></>;
    if (!data.length) return <NotFoundCard />;

    return data.map((character: ICharacterData) => (
      <CharacterCard key={character.id} {...character} />
    ));
  };

  return (
    <>
      {loader ? <div className="loading"></div> : null}
      <div className="characters-list">{showData(characterData)}</div>
    </>
  );
}

export default CharactersList;
