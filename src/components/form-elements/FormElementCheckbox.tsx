import FormElementContainer from './FormElementContainer';
import ErrorMessage from './ErrorMessage';
import { ElementInputProps } from '../../utils/types';

function FormElementCheckbox({ label, inputProps, errors }: ElementInputProps) {
  return (
    <FormElementContainer>
      <div className="field">
        <div className="input">
          <input {...inputProps} />
          <label htmlFor={inputProps.id}>{label}</label>
        </div>
      </div>
      {errors?.length ? <ErrorMessage errors={errors} /> : null}
    </FormElementContainer>
  );
}

export default FormElementCheckbox;
