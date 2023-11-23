import { CharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './CharactersList.module.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';
import Pager from '../Pager/Pager';
import ItemsPerPage from '../ItemsPerPage/ItemsPerPage';
import { useSelectorCustom } from '../../state/store';
import { useGetDataQuery } from '../../services/api/rickMortyApi';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import { turnOff, turnOn } from '../../state/loadingList/loadingListSlice';
import { useEffect, useState } from 'react';
import ViewMode from '../ViewMode/ViewMode';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const TEST_ID = 'characters-list';

type DataType = CharacterData[] | null;

function CharactersList() {
  const router = useRouter();
  const searchTerm = useSelectorCustom('searchTerm');
  const itemsPerPage = useSelectorCustom('itemsPerPage');
  const loadingList = useSelectorCustom('loadingList');
  const viewMode = useSelectorCustom('viewMode');
  const pageID = router.query.pageID;
  const page = +(pageID || 1);
  const [charactersData, setCharactersData] = useState<DataType>(null);
  const [pagesCount, setPagesCount] = useState(0);
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

    console.log(router.asPath);
    return data.map((character: CharacterData) => (
      <Link
        key={character.id}
        className={styles.card_link}
        href={`${router.asPath}?characterID=${character.id}`}
        scroll={false}
      >
        <CharacterCard {...character} />
      </Link>
    ));
  };

  return (
    <>
      {loadingList ? <Loader /> : null}
      <div className={styles.controls}>
        {pagesCount ? (
          <>
            <Pager currentPage={page} pagesCount={pagesCount} />
            <ItemsPerPage />
            <ViewMode />
          </>
        ) : null}
      </div>
      <div
        className={`${styles.characters_list}
        ${styles[`view_mode__${viewMode}`]}`}
        data-testid={TEST_ID}
      >
        {showData(charactersData)}
      </div>
    </>
  );
}

export default CharactersList;
