import { useContext } from 'react';
import { CharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharactersList.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';
import Pager from '../Pager/Pager';
import { NavLink } from 'react-router-dom';
import ItemsPerPage from '../ItemsPerPage/ItemsPerPage';
import { MainPageContext } from '../pages/MainPage/MainPage';

function CharactersList() {
  const { charactersData } = useContext(MainPageContext);

  const showData = (
    data: CharacterData[] | null
  ): JSX.Element | JSX.Element[] => {
    if (data === null) return <></>;
    if (!data.length) return <NotFoundCard />;

    return data.map((character: CharacterData) => (
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
      <div className="controls">
        <Pager />
        <ItemsPerPage />
      </div>
      <div className="characters-list">{showData(charactersData)}</div>
    </>
  );
}

export default CharactersList;
