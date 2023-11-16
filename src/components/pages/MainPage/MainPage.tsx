import { createContext, useEffect, useState } from 'react';
import CharactersList from '../../CharactersList/CharactersList';
import SearchBar from '../../SearchBar/SearchBar';
import Logo from '../../Logo/Logo';
import ErrorButton from '../../ErrorButton/ErrorButton';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import DataLoader from '../../../services/dataLoader/dataLoader';
import Loader from '../../Loader/Loader';
import { CharacterData } from '../../../types/types';
import { useSelectorCustom } from '../../../state/store';

interface Context {
  page: number;
  charactersData: CharacterData[] | null;
  pagesCount: number;
  goTo: (val: string) => void;
  goToPage: (val: number) => void;
}

export const defaultContext: Context = {
  page: 1,
  charactersData: null,
  pagesCount: 0,
  goTo: () => {},
  goToPage: () => {},
};

export const MainPageContext = createContext<Context>(defaultContext);

function MainPage() {
  const searchTerm = useSelectorCustom('searchTerm');
  const itemsPerPage = useSelectorCustom('itemsPerPage');

  const [charactersData, setCharactersData] = useState<CharacterData[] | null>(
    null
  );
  const [loader, setLoader] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);
  const { pageID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageID || !Number(pageID)) navigate('/page/1', { replace: true });

    const dataLoader = new DataLoader();
    const page = +(pageID || 1);

    const loadData = async (searchTerm: string, page: number | undefined) => {
      try {
        const data = await dataLoader.getData(searchTerm, page, itemsPerPage);

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
  }, [pageID, navigate, searchTerm, itemsPerPage]);

  const goTo = (link: string) => {
    navigate(link);
  };

  const goToPage = (pageNum: number) => {
    goTo(`/page/${pageNum}`);
  };

  const context = {
    searchTerm,
    page: +(pageID || 1),
    charactersData,
    pagesCount,
    goTo,
    goToPage,
  };

  return (
    <ErrorBoundary>
      {loader ? <Loader /> : null}
      <MainPageContext.Provider value={context}>
        <ErrorButton />
        <Logo />
        <SearchBar />
        <CharactersList />
        <Outlet />
      </MainPageContext.Provider>
    </ErrorBoundary>
  );
}

export default MainPage;
