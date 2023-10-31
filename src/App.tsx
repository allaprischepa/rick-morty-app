import { useState } from 'react';
import './App.scss';
import CharactersList from './components/CharactersList/CharactersList';
import SearchBar from './components/SearchBar/SearchBar';
import Logo from './components/Logo/Logo';
import ErrorButton from './components/ErrorButton/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  const SEARCH_TERM_NAME = 'RMAppSearchTerm';
  const savedTerm = localStorage.getItem(SEARCH_TERM_NAME);
  const [searchTerm, setSearchTerm] = useState(savedTerm ? savedTerm : '');

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

export default App;
