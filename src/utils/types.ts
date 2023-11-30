import { RefObject } from 'react';

export interface InputProps {
  type: string;
  name: string;
  id: string;
  ref?: RefObject<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
}

export interface ElementInputProps {
  label: string;
  inputProps: InputProps;
  errors?: string[];
}
