import { boolean, mixed, number, object, ref, string } from 'yup';

const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB
const FILE_TYPES = ['image/jpeg', 'image/png'];

export const formSettings = {
  name: {
    label: 'Name',
    inputProps: {
      type: 'text',
      name: 'name',
      id: 'name',
      placeholder: 'John Doe',
    },
  },
  age: {
    label: 'Age',
    inputProps: {
      type: 'number',
      name: 'age',
      id: 'age',
      placeholder: '30',
    },
  },
  email: {
    label: 'Email',
    inputProps: {
      type: 'text',
      name: 'email',
      id: 'email',
      placeholder: 'john_doe@example.com',
    },
  },
  password: {
    label: 'Password',
    inputProps: {
      type: 'password',
      name: 'password',
      id: 'password',
      placeholder: '*****',
    },
  },
  confirmPassword: {
    label: 'Confirm password',
    inputProps: {
      type: 'password',
      name: 'confirmPassword',
      id: 'confirmPassword',
      placeholder: '*****',
    },
  },
  gender: {
    label: 'Gender',
    inputProps: {
      type: 'hidden',
      name: 'gender',
      id: 'gender',
    },
    radios: [
      {
        label: 'Male',
        inputProps: {
          type: 'radio',
          name: 'gender',
          id: 'male',
          value: 'male',
        },
      },
      {
        label: 'Female',
        inputProps: {
          type: 'radio',
          name: 'gender',
          id: 'female',
          value: 'female',
        },
      },
      {
        label: 'Other',
        inputProps: {
          type: 'radio',
          name: 'gender',
          id: 'other',
          value: 'other',
        },
      },
    ],
  },
  acceptTC: {
    label: 'Accept Terms & Conditions',
    inputProps: {
      type: 'checkbox',
      name: 'acceptTC',
      id: 'acceptTC',
    },
  },
  profilePicture: {
    label: 'Profile picture',
    inputProps: {
      type: 'file',
      name: 'profilePicture',
      id: 'profilePicture',
      accept: FILE_TYPES.join(','),
    },
  },
};

export const validationSchema = object().shape({
  name: string()
    .required('Name field is required')
    .matches(/^[A-Z].*$/, 'First letter must be uppercased')
    .matches(
      /^[A-Z][\sA-Za-z0-9_-]*$/,
      'Only letters, numbers, hyphen and underscore are allowed'
    ),
  age: number()
    .transform((val, orig) => (orig == '' ? undefined : val))
    .required('Age field is required')
    .min(0, 'Age must be a positive number')
    .max(150, 'Age must be less than 150'),
  email: string()
    .required('Email field is required')
    .email('Must be a valid email, e.g. john_doe@example.com'),
  password: string()
    .required('Password field is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character [@$!%*?&]'
    ),
  confirmPassword: string().oneOf([ref('password')], 'Passwords must match'),
  gender: string().required('Gender field is required'),
  acceptTC: boolean().isTrue('You must accept the Terms & Conditions'),
  profilePicture: mixed()
    .test(
      'required',
      'Profile picture field is required',
      (value) => value instanceof FileList && Boolean(value.length)
    )
    .test(
      'fileSize',
      'The file size must be less than 2MB',
      (value) =>
        value instanceof FileList &&
        [...value].every((file: File) => file.size <= FILE_SIZE_LIMIT)
    )
    .test(
      'type',
      'The file type must be only JPEG or PNG',
      (value) =>
        value instanceof FileList &&
        [...value].every((file: File) => FILE_TYPES.includes(file.type))
    ),
});
