interface Props {
  children: React.ReactNode;
}

function FormElementContainer({ children }: Props) {
  return <div className="form-element">{children}</div>;
}

export default FormElementContainer;
