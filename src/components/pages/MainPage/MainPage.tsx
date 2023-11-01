import { useState } from 'react';
import CharactersList from '../../CharactersList/CharactersList';
import SearchBar from '../../SearchBar/SearchBar';
import Logo from '../../Logo/Logo';
import ErrorButton from '../../ErrorButton/ErrorButton';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';

function MainPage() {
  const SEARCH_TERM_NAME = 'RMAppSearchTerm';
  const savedTerm = localStorage.getItem(SEARCH_TERM_NAME);
  const [searchTerm, setSearchTerm] = useState(savedTerm ?? '');

  const updateSearchTerm = (value: string) => {
    setSearchTerm(value);
    localStorage.setItem(SEARCH_TERM_NAME, value);
  };

  return (
    <ErrorBoundary>
      <ErrorButton />
      <Logo />
      <SearchBar searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} />
      <CharactersList searchTerm={searchTerm} />
    </ErrorBoundary>
  );
}

export default MainPage;
