import { createContext, useEffect, useState } from 'react';
import CharactersList from '../../CharactersList/CharactersList';
import SearchBar from '../../SearchBar/SearchBar';
import Logo from '../../Logo/Logo';
import ErrorButton from '../../ErrorButton/ErrorButton';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { API_ITEMS_PER_PAGE } from '../../../services/dataLoader/settings';
import DataLoader from '../../../services/dataLoader/dataLoader';
import Loader from '../../Loader/Loader';
import { CharacterData } from '../../../types/types';

interface Context {
  searchTerm: string;
  page: number;
  itemsPerPage: number;
  updateSearchTerm: (val: string) => void;
  updateItemsPerPage: (val: number) => void;
  charactersData: CharacterData[] | null;
  pagesCount: number;
}

const defaultContext: Context = {
  searchTerm: '',
  page: 1,
  itemsPerPage: API_ITEMS_PER_PAGE,
  updateSearchTerm: () => {},
  updateItemsPerPage: () => {},
  charactersData: null,
  pagesCount: 0,
};

export const MainPageContext = createContext<Context>(defaultContext);

function MainPage() {
  const SEARCH_TERM_NAME = 'RMAppSearchTerm';
  const savedTerm = localStorage.getItem(SEARCH_TERM_NAME);
  const [searchTerm, setSearchTerm] = useState(savedTerm ?? '');
  const [itemsPerPage, setItemsPerPage] = useState(API_ITEMS_PER_PAGE);
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

  const updateSearchTerm = (value: string) => {
    setSearchTerm(value);
    localStorage.setItem(SEARCH_TERM_NAME, value);

    navigate('/page/1', { replace: true });
  };

  const updateItemsPerPage = (value: number) => {
    setItemsPerPage(value);
    navigate('/page/1', { replace: true });
  };

  const context = {
    searchTerm,
    page: +(pageID || 1),
    itemsPerPage,
    updateSearchTerm,
    updateItemsPerPage,
    charactersData,
    pagesCount,
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
