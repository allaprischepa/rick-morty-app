import { Component, FormEvent } from 'react';
import { IAppProps } from '../types/types';

const SEARCH_INPUT_NAME = 'searchInput';

class SearchBar extends Component<IAppProps> {
  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInput =
      event.currentTarget.elements.namedItem(SEARCH_INPUT_NAME);

    if (searchInput instanceof HTMLInputElement) {
      this.props.updateSearchTerm(searchInput.value);
    }
  };

  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name={SEARCH_INPUT_NAME}
          defaultValue={this.props.searchTerm}
          placeholder="Search"
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default SearchBar;
