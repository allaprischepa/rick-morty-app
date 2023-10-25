import { Component, FormEvent } from 'react';

interface AppProps {
  searchTerm: string;
  updateSearchTerm: (value: string) => void;
}

class SearchBar extends Component<AppProps> {
  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchInput = event.currentTarget.elements.namedItem('searchInput');

    if (searchInput instanceof HTMLInputElement) {
      this.props.updateSearchTerm(searchInput.value);
    }
  };

  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="searchInput"
          defaultValue={this.props.searchTerm}
          placeholder="Search"
        ></input>
        <input type="submit" value="Search"></input>
      </form>
    );
  }
}

export default SearchBar;
