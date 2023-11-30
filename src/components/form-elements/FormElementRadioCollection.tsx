import { ElementInputProps } from '../../utils/types';
import ErrorMessage from './ErrorMessage';
import FormElementContainer from './FormElementContainer';

interface Props extends ElementInputProps {
  radios: ElementInputProps[];
}

function FormElementRadioCollection({
  label,
  inputProps,
  radios,
  errors,
}: Props) {
  const handleRadio = (event: React.MouseEvent<HTMLInputElement>) => {
    const { ref } = inputProps;

    if (ref?.current && event.target instanceof HTMLInputElement) {
      ref.current.value = event.target.value;
    }
  };

  return (
    <FormElementContainer>
      <input {...inputProps} />
      <label htmlFor={inputProps.id}>{label}</label>
      {radios.map((radio, key) => (
        <span key={key}>
          <input {...radio.inputProps} onClick={handleRadio} />
          <label htmlFor={radio.inputProps.id}>{radio.label}</label>
        </span>
      ))}
      {errors?.length ? <ErrorMessage errors={errors} /> : null}
    </FormElementContainer>
  );
}

export default FormElementRadioCollection;
