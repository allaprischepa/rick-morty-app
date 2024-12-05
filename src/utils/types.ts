import { ChangeEvent, RefObject } from 'react';
import { RefCallBack } from 'react-hook-form';

export interface InputProps {
  type: string;
  name: string;
  id: string;
  ref?: RefObject<HTMLInputElement> | RefCallBack;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  setValue?: (val: string) => void;
  onChange?: (event: ChangeEvent) => void;
}

export interface ElementInputProps {
  label: string;
  inputProps: InputProps;
  errors?: string[];
}

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTC: boolean;
  profilePicture: FileList | null;
  country: string;
}

export type FormDataWithUndefined = {
  [K in keyof FormData]: FormData[K] | undefined;
};

export interface FormDataToSave
  extends Omit<FormDataWithUndefined, 'profilePicture'> {
  profilePicture: string;
}

export const formDataToSaveKeys: Array<keyof FormDataToSave> = [
  'profilePicture',
  'name',
  'age',
  'email',
  'password',
  'confirmPassword',
  'gender',
  'country',
  'acceptTC',
];
