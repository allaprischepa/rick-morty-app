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
  const { setValue, ...inputPropsRest } = inputProps;
  const handleRadio = (event: React.MouseEvent<HTMLInputElement>) => {
    if (setValue && event.target instanceof HTMLInputElement) {
      setValue(event.target.value);
    }
  };

  return (
    <FormElementContainer>
      <input {...inputPropsRest} />
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
