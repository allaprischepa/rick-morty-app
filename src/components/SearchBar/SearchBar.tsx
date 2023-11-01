import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { IAppProps } from '../../types/types';
import './SearchBar.scss';

function SearchBar({ searchTerm, updateSearchTerm }: IAppProps) {
  const inputElement = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const current = inputElement.current;

    if (current) {
      const value = current.value.trim();
      setInputValue(value);
      updateSearchTerm(value);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputElement}
        value={inputValue}
        placeholder="Type the name..."
        className="search-input"
        onChange={handleChange}
      />
      <button type="submit" title="Search" className="search-button" />
    </form>
  );
}

export default SearchBar;
