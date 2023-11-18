import { CharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharactersList.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';
import Pager from '../Pager/Pager';
import ItemsPerPage from '../ItemsPerPage/ItemsPerPage';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelectorCustom } from '../../state/store';
import { useGetDataQuery } from '../../services/api/rickMortyApi';
import Loader from '../Loader/Loader';

export const TEST_ID = 'characters-list';

function CharactersList() {
  const searchTerm = useSelectorCustom('searchTerm');
  const itemsPerPage = useSelectorCustom('itemsPerPage');
  const { pageID } = useParams();
  const page = +(pageID || 1);
  const navigate = useNavigate();
  const { data, isFetching } = useGetDataQuery({
    searchTerm,
    page,
    itemsPerPage,
  });

  const charactersData = data?.results ?? null;
  const pagesCount = data?.pages ?? 0;

  const showData = (
    data: CharacterData[] | null
  ): JSX.Element | JSX.Element[] => {
    if (data === null) return <></>;
    if (!data.length) return <NotFoundCard />;

    return data.map((character: CharacterData) => (
      <div
        key={character.id}
        onClick={() => navigate(`./details/${character.id}`)}
        className="card-link"
      >
        <CharacterCard {...character} />
      </div>
    ));
  };

  return (
    <>
      {isFetching ? <Loader /> : null}
      <div className="controls">
        <Pager currentPage={page} pagesCount={pagesCount} />
        <ItemsPerPage />
      </div>
      <div className="characters-list" data-testid={TEST_ID}>
        {showData(charactersData)}
      </div>
    </>
  );
}

export default CharactersList;
