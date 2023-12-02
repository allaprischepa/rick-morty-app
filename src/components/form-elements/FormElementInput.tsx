import FormElementContainer from './FormElementContainer';
import ErrorMessage from './ErrorMessage';
import { ElementInputProps } from '../../utils/types';

function FormElementInput({ label, inputProps, errors }: ElementInputProps) {
  return (
    <FormElementContainer>
      <div className="field">
        <div className="label">
          <label htmlFor={inputProps.id}>{label}</label>
        </div>
        <div className="input">
          <input {...inputProps} />
        </div>
      </div>
      {errors?.length ? <ErrorMessage errors={errors} /> : null}
    </FormElementContainer>
  );
}

export default FormElementInput;
