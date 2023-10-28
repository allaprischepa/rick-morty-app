import { Component } from 'react';
import './App.scss';
import CharactersList from './components/CharactersList/CharactersList';
import SearchBar from './components/SearchBar/SearchBar';
import Logo from './components/Logo/Logo';
import ErrorButton from './components/ErrorButton/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { IProps } from './types/types';

const SEARCH_TERM_NAME = 'RMAppSearchTerm';
const savedTerm = localStorage.getItem(SEARCH_TERM_NAME);

interface State {
  searchTerm: string;
}

class App extends Component<IProps, State> {
  state: State = {
    searchTerm: savedTerm ? savedTerm : '',
  };

  updateSearchTerm = (value: string) => {
    if (this.state.searchTerm !== value) {
      this.setState({ searchTerm: value });
      localStorage.setItem(SEARCH_TERM_NAME, value);
    }
  };

  render() {
    return (
      <>
        <ErrorBoundary>
          <ErrorButton></ErrorButton>
          <Logo></Logo>
          <SearchBar
            searchTerm={this.state.searchTerm}
            updateSearchTerm={this.updateSearchTerm}
          ></SearchBar>
          <CharactersList searchTerm={this.state.searchTerm}></CharactersList>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
