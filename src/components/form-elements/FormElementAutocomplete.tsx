import FormElementContainer from './FormElementContainer';
import ErrorMessage from './ErrorMessage';
import { ElementInputProps } from '../../utils/types';
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setValue, ...inputPropsRest } = inputProps;

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        event.target instanceof Node &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  });

  const handleChange = (event: ChangeEvent) => {
    if (inputProps.onChange) inputProps.onChange(event);
    handleInputChangeClick(event);
  };

  const handleInputChangeClick = (event: ChangeEvent | MouseEvent) => {
    if (event.target instanceof HTMLInputElement) {
      const value = event.target.value;

      const filtered = autocompleteList.filter((val) =>
        val.toLowerCase().includes(value.toLowerCase())
      );

      setActive(0);
      setIsVisible(true);
      setFilteredValues(filtered);
    }
  };

  const handleSelect = (val: string) => {
    if (setValue) setValue(val);
    setActive(0);
    setIsVisible(false);
    setFilteredValues([]);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      setIsVisible(false);
      if (setValue) setValue(filteredValues[active]);
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
      } else return null;
    }
    return <></>;
  };

  return (
    <FormElementContainer>
      <div ref={dropdownRef}>
        <label htmlFor={inputProps.id}>{label}</label>
        <input
          {...inputPropsRest}
          onChange={handleChange}
          onClick={handleInputChangeClick}
          onKeyDown={onKeyDown}
        />
        {renderAutocomplete()}
      </div>
      {errors?.length ? <ErrorMessage errors={errors} /> : null}
    </FormElementContainer>
  );
}

export default FormElementAutocomplete;
