import FormElementContainer from './FormElementContainer';

interface Props {
  disabled?: boolean;
}

function FormSubmit({ disabled }: Props) {
  return (
    <FormElementContainer>
      <input type="submit" value="Submit" disabled={disabled ?? false} />
    </FormElementContainer>
  );
}

export default FormSubmit;
