import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import s from './SearchBar.module.scss';
import { useDispatch } from 'react-redux';
import { useSelectorCustom } from '../../state/store';
import { updateSearchTerm } from '../../state/searchTerm/searchTermSlice';
import { useRouter } from 'next/router';

export const TEST_ID = 'search-bar';

function SearchBar() {
  const searchTerm = useSelectorCustom('searchTerm');
  const inputElement = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(searchTerm);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const current = inputElement.current;

    if (current) {
      const value = current.value.trim();
      setInputValue(value);
      dispatch(updateSearchTerm(value));

      if (searchTerm !== value) router.replace('/page/1');
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
