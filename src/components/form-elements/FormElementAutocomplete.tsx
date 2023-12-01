import FormElementContainer from './FormElementContainer';
import ErrorMessage from './ErrorMessage';
import { ElementInputProps } from '../../utils/types';
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';

interface Props extends ElementInputProps {
  autocompleteList: string[];
}

function FormElementAutocomplete({
  label,
  inputProps,
  errors,
  autocompleteList,
}: Props) {
  const [filteredValues, setFilteredValues] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { ref } = inputProps;

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref?.current && ref.current !== event.target) setIsVisible(false);
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  });

  const handleInputChangeClick = (event: ChangeEvent | MouseEvent) => {
    if (event.target instanceof HTMLInputElement) {
      const value = event.target.value;

      const filtered = autocompleteList.filter((val) =>
        val.toLowerCase().includes(value.toLowerCase())
      );

      setActive(0);
      setIsVisible(true);
      setFilteredValues(filtered);
      ref?.current?.focus();
    }
  };

  const handleSelect = (val: string) => {
    console.log(val);
    if (ref?.current) ref.current.value = val;
    setActive(0);
    setIsVisible(false);
    setFilteredValues([]);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      setIsVisible(false);
      if (ref?.current) ref.current.value = filteredValues[active];
    } else if (event.key === 'ArrowUp') {
      return active === 0 ? null : setActive(active - 1);
    } else if (event.key === 'ArrowDown') {
      return active - 1 === filteredValues.length
        ? null
        : setActive(active + 1);
    }
  };

  const renderAutocomplete = () => {
    if (isVisible) {
      if (filteredValues.length) {
        return (
          <ul className="autocompleteList">
            {filteredValues.map((val, index) => {
              let className;
              if (index === active) {
                className = 'active';
              }
              return (
                <li
                  className={className}
                  key={val}
                  onClick={() => handleSelect(val)}
                >
                  {val}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-autocomplete">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  };

  return (
    <FormElementContainer>
      <label htmlFor={inputProps.id}>{label}</label>
      <input
        {...inputProps}
        onChange={handleInputChangeClick}
        onClick={handleInputChangeClick}
        onKeyDown={onKeyDown}
      />
      {renderAutocomplete()}
      {errors?.length ? <ErrorMessage errors={errors} /> : null}
    </FormElementContainer>
  );
}

export default FormElementAutocomplete;
