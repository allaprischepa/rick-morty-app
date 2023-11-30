import FormElementContainer from './FormElementContainer';
import ErrorMessage from './ErrorMessage';
import { ElementInputProps } from '../../utils/types';

function FormElementInput({ label, inputProps, errors }: ElementInputProps) {
  return (
    <FormElementContainer>
      <label htmlFor={inputProps.id}>{label}</label>
      <input {...inputProps} />
      {errors?.length ? <ErrorMessage errors={errors} /> : null}
    </FormElementContainer>
  );
}

export default FormElementInput;
