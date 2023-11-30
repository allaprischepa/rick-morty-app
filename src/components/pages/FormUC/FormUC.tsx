import { FormEvent, useRef, useState } from 'react';
import FormElementInput from '../../form-elements/FormElementInput';
import { formSettings, validationSchema } from '../../../utils/form-settings';
import FormSubmit from '../../form-elements/FormSubmit';
import { ValidationError } from 'yup';
import FormElementCheckbox from '../../form-elements/FormElementCheckbox';
import FormElementRadioCollection from '../../form-elements/FormElementRadioCollection';

interface FormErrors {
  [key: string]: string[];
}

function FormUC() {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptTCRef = useRef<HTMLInputElement>(null);
  const profilePictureRef = useRef<HTMLInputElement>(null);

  const getFormData = () => {
    return {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      acceptTC: acceptTCRef.current?.checked,
      profilePicture: profilePictureRef.current?.files,
    };
  };

  const onSuccess = () => {
    setFormErrors({});
  };

  const onError = (err: ValidationError) => {
    const errors: FormErrors = {};

    err.inner.forEach((error: ValidationError) => {
      if (error.path) {
        if (!errors[error.path]?.length) errors[error.path] = [];
        errors[error.path].push(error.message);
      }
    });

    setFormErrors(errors);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    validationSchema
      .validate(getFormData(), { abortEarly: false })
      .then(() => onSuccess())
      .catch((err: ValidationError) => onError(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormElementInput
        label={formSettings.name.label}
        inputProps={{ ...formSettings.name.inputProps, ref: nameRef }}
        errors={formErrors.name}
      />
      <FormElementInput
        label={formSettings.age.label}
        inputProps={{ ...formSettings.age.inputProps, ref: ageRef }}
        errors={formErrors.age}
      />
      <FormElementInput
        label={formSettings.email.label}
        inputProps={{ ...formSettings.email.inputProps, ref: emailRef }}
        errors={formErrors.email}
      />
      <FormElementInput
        label={formSettings.password.label}
        inputProps={{ ...formSettings.password.inputProps, ref: passwordRef }}
        errors={formErrors.password}
      />
      <FormElementInput
        label={formSettings.confirmPassword.label}
        inputProps={{
          ...formSettings.confirmPassword.inputProps,
          ref: confirmPasswordRef,
        }}
        errors={formErrors.confirmPassword}
      />
      <FormElementRadioCollection
        label={formSettings.gender.label}
        inputProps={{
          ...formSettings.gender.inputProps,
          ref: genderRef,
        }}
        radios={formSettings.gender.radios}
        errors={formErrors.gender}
      />
      <FormElementCheckbox
        label={formSettings.acceptTC.label}
        inputProps={{ ...formSettings.acceptTC.inputProps, ref: acceptTCRef }}
        errors={formErrors.acceptTC}
      />
      <FormElementInput
        label={formSettings.profilePicture.label}
        inputProps={{
          ...formSettings.profilePicture.inputProps,
          ref: profilePictureRef,
        }}
        errors={formErrors.profilePicture}
      />
      <FormSubmit />
    </form>
  );
}

export default FormUC;
