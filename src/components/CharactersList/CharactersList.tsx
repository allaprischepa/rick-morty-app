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
import { useDispatch } from 'react-redux';
import { turnOff, turnOn } from '../../state/loadingList/loadingListSlice';
import { useEffect, useState } from 'react';

export const TEST_ID = 'characters-list';

type DataType = CharacterData[] | null;

function CharactersList() {
  const searchTerm = useSelectorCustom('searchTerm');
  const itemsPerPage = useSelectorCustom('itemsPerPage');
  const loadingList = useSelectorCustom('loadingList');
  const { pageID } = useParams();
  const page = +(pageID || 1);
  const [charactersData, setCharactersData] = useState<DataType>(null);
  const [pagesCount, setPagesCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useGetDataQuery({
    searchTerm,
    page,
    itemsPerPage,
  });

  useEffect(() => {
    isFetching && !loadingList
      ? dispatch(turnOn())
      : setTimeout(() => dispatch(turnOff()), 250);

    if (!loadingList) {
      setCharactersData(data?.results ?? null);
      setPagesCount(data?.pages ?? 0);
    }
  }, [
    charactersData,
    pagesCount,
    isFetching,
    loadingList,
    data?.results,
    data?.pages,
    dispatch,
  ]);

  const showData = (data: DataType): JSX.Element | JSX.Element[] => {
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
      {loadingList ? <Loader /> : null}
      <div className="controls">
        {pagesCount ? (
          <>
            <Pager currentPage={page} pagesCount={pagesCount} />
            <ItemsPerPage />
          </>
        ) : null}
      </div>
      <div className="characters-list" data-testid={TEST_ID}>
        {showData(charactersData)}
      </div>
    </>
  );
}

export default CharactersList;
