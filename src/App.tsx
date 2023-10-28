import { Component } from 'react';
import './App.scss';
import CharactersList from './components/CharactersList/CharactersList';
import SearchBar from './components/SearchBar/SearchBar';
import Logo from './components/Logo/Logo';

const SEARCH_TERM_NAME = 'RMAppSearchTerm';
const savedTerm = localStorage.getItem(SEARCH_TERM_NAME);

class App extends Component {
  state = {
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
        <Logo></Logo>
        <SearchBar
          searchTerm={this.state.searchTerm}
          updateSearchTerm={this.updateSearchTerm}
        ></SearchBar>
        <CharactersList searchTerm={this.state.searchTerm}></CharactersList>
      </>
    );
  }
}

export default App;
