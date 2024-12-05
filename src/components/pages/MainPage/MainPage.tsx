import { useEffect, useState } from 'react';
import CharactersList from '../../CharactersList/CharactersList';
import SearchBar from '../../SearchBar/SearchBar';
import Logo from '../../Logo/Logo';
import ErrorButton from '../../ErrorButton/ErrorButton';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { API_ITEMS_PER_PAGE } from '../../../services/dataLoader/settings';

function MainPage() {
  const SEARCH_TERM_NAME = 'RMAppSearchTerm';
  const savedTerm = localStorage.getItem(SEARCH_TERM_NAME);
  const [searchTerm, setSearchTerm] = useState(savedTerm ?? '');
  const [itemsPerPage, setItemsPerPage] = useState(API_ITEMS_PER_PAGE);
  const { pageID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageID || !Number(pageID)) navigate('/page/1', { replace: true });
  }, [pageID, navigate]);

  const updateSearchTerm = (value: string) => {
    setSearchTerm(value);
    localStorage.setItem(SEARCH_TERM_NAME, value);

    navigate('/page/1', { replace: true });
  };

  const updateItemsPerPage = (value: number) => {
    setItemsPerPage(value);
    navigate('/page/1', { replace: true });
  };

  return (
    <ErrorBoundary>
      <ErrorButton />
      <Logo />
      <SearchBar searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} />
      <CharactersList
        searchTerm={searchTerm}
        page={+(pageID || 1)}
        itemsPerPage={itemsPerPage}
        updateItemsPerPage={updateItemsPerPage}
      />
      <Outlet />
    </ErrorBoundary>
  );
}

export default MainPage;
