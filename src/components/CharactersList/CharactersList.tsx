import { CharacterData } from '../../types/types';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './CharactersList.module.scss';
import NotFoundCard from '../NotFoundCard/NotFoundCard';
import Pager from '../Pager/Pager';
import ItemsPerPage from '../ItemsPerPage/ItemsPerPage';
import ViewMode from '../ViewMode/ViewMode';
import { useRouter } from 'next/router';

export const TEST_ID = 'characters-list';

type DataType = CharacterData[] | null;

function CharactersList({ props }) {
  const router = useRouter();
  const { listData, viewMode, itemsPerPage } = props;
  const pageID = +router.query.pageID;
  const pagesCount = listData.pages;
  const charactersData = listData.results;

  const showData = (data: DataType): JSX.Element | JSX.Element[] => {
    if (data === null) return <></>;
    if (!data.length) return <NotFoundCard />;

    return data.map((character: CharacterData) => (
      <div
        key={character.id}
        className={styles.card_link}
        onClick={() => {
          const queryParams = { pageID, characterID: character.id };

          router.push(
            {
              pathname: `${router.pathname}`,
              query: { ...router.query, ...queryParams },
            },
            `/page/${pageID}/details/${character.id}`,
            { scroll: false }
          );
        }}
      >
        <CharacterCard viewMode={viewMode} {...character} />
      </div>
    ));
  };

  return (
    <>
      <div className={styles.controls}>
        {pagesCount ? (
          <>
            <Pager currentPage={pageID} pagesCount={pagesCount} />
            <ItemsPerPage defaultValue={itemsPerPage} />
            <ViewMode viewMode={viewMode} />
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
