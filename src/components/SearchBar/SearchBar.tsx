import { FormEvent, useRef } from 'react';
import { IAppProps } from '../../types/types';
import './SearchBar.scss';

function SearchBar({ searchTerm, updateSearchTerm }: IAppProps) {
  const inputElement = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const current = inputElement.current;

    if (current) {
      current.value = current.value.trim();
      updateSearchTerm(current.value);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputElement}
        defaultValue={searchTerm}
        placeholder="Type the name..."
        className="search-input"
      />
      <button type="submit" title="Search" className="search-button" />
    </form>
  );
}

export default SearchBar;
