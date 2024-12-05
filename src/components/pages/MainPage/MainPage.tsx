import CharactersList from '../../CharactersList/CharactersList';
import SearchBar from '../../SearchBar/SearchBar';
import Logo from '../../Logo/Logo';
import ErrorButton from '../../ErrorButton/ErrorButton';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function MainPage() {
  const { pageID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageID || !Number(pageID)) navigate('/page/1', { replace: true });
  });

  return (
    <ErrorBoundary>
      <ErrorButton />
      <Logo />
      <SearchBar />
      <CharactersList />
      <Outlet />
    </ErrorBoundary>
  );
}

export default MainPage;
