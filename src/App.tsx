import { Component } from 'react';
import './App.scss';
import CharactersList from './components/Characters/CharactersList';
import SearchBar from './components/SearchBar';

const SEARCH_TERM_NAME = 'RMAppSearchTerm';
const savedTerm = localStorage.getItem(SEARCH_TERM_NAME);

class App extends Component {
  state = {
    searchTerm: savedTerm ? savedTerm : '',
  };

  updateSearchTerm = (value: string) => {
    console.log(value);
    this.setState({ searchTerm: value });
    localStorage.setItem(SEARCH_TERM_NAME, value);
  };

  render() {
    return (
      <>
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
