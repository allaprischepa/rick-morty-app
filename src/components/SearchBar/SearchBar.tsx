import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import s from './SearchBar.module.scss';
import { useRouter } from 'next/router';

export const TEST_ID = 'search-bar';

function SearchBar({ defaultValue }) {
  const inputElement = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const current = inputElement.current;

    if (current) {
      const value = current.value.trim();
      setInputValue(value);

      const queryParams = { searchTerm: value };

      router.push(
        {
          pathname: '/page/1',
          query: { ...router.query, ...queryParams },
        },
        '/page/1'
      );
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form
      className={s['search-bar']}
      onSubmit={handleSubmit}
      data-testid={TEST_ID}
    >
      <input
        type="text"
        ref={inputElement}
        value={inputValue}
        placeholder="Type the name..."
        className={s['search-input']}
        onChange={handleChange}
      />
      <button type="submit" title="Search" className={s['search-button']} />
    </form>
  );
}

export default SearchBar;
