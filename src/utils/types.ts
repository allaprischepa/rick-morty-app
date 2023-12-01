import { ChangeEvent, RefObject } from 'react';
import { RefCallBack } from 'react-hook-form';

export interface InputProps {
  type: string;
  name: string;
  id: string;
  ref?: RefObject<HTMLInputElement> | RefCallBack;
  placeholder?: string;
  required?: boolean;
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
  profilePicture: FileList;
  country: string;
}

export type FormDataWithUndefined = Record<
  keyof FormData,
  FormData[keyof FormData] | undefined | null
>;
