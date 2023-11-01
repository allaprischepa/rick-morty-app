import { useState } from 'react';
import CharactersList from '../../CharactersList/CharactersList';
import SearchBar from '../../SearchBar/SearchBar';
import Logo from '../../Logo/Logo';
import ErrorButton from '../../ErrorButton/ErrorButton';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { useLoaderData } from 'react-router-dom';
import { IAppProps } from '../../../types/types';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const pageQuery = url.searchParams.get('page');
  const page = Number(pageQuery) || 1;
  return { page };
}

function MainPage() {
  const SEARCH_TERM_NAME = 'RMAppSearchTerm';
  const savedTerm = localStorage.getItem(SEARCH_TERM_NAME);
  const [searchTerm, setSearchTerm] = useState(savedTerm ?? '');
  const { page } = useLoaderData() as Pick<IAppProps, 'page'>;

  const updateSearchTerm = (value: string) => {
    setSearchTerm(value);
    localStorage.setItem(SEARCH_TERM_NAME, value);
  };

  return (
    <ErrorBoundary>
      <ErrorButton />
      <Logo />
      <SearchBar searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} />
      <CharactersList searchTerm={searchTerm} page={page} />
    </ErrorBoundary>
  );
}

export default MainPage;
