import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSettings, validationSchema } from '../../../utils/form-settings';
import FormElementInput from '../../form-elements/FormElementInput';
import FormSubmit from '../../form-elements/FormSubmit';
import FormElementCheckbox from '../../form-elements/FormElementCheckbox';
import FormElementRadioCollection from '../../form-elements/FormElementRadioCollection';
import FormElementAutocomplete from '../../form-elements/FormElementAutocomplete';
import { useAppSelector } from '../../../state/store';
import { FormData, FormDataWithUndefined } from '../../../utils/types';
import { isString } from '../../../utils/utils';
import { saveData, transformFormData } from '../../../utils/form-utils';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../router/router';
import Layout from '../../Layout/Layout';
import '../../../styles/form.scss';

type FormErrors = DeepMap<FormData, FieldError>;

function FormRHF() {
  const navigate = useNavigate();
  const countries = useAppSelector('countryList');
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = async (data: Partial<FormDataWithUndefined>) => {
    const defaultData: FormDataWithUndefined = {
      name: undefined,
      age: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      gender: undefined,
      acceptTC: undefined,
      profilePicture: undefined,
      country: undefined,
    };
    const formData = { ...defaultData, ...data };
    const trasformedData = await transformFormData(formData);
    saveData(trasformedData);
    navigate(AppRoutes.MainPage);
  };

  const getErrors = (name: keyof FormErrors): string[] => {
    const res = [];
    if (errors[name] !== undefined && isString(errors[name]?.message))
      res.push(errors[name]!.message!);

    return res;
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormElementInput
          label={formSettings.name.label}
          inputProps={{ ...formSettings.name.inputProps, ...register('name') }}
          errors={getErrors('name')}
        />
        <FormElementInput
          label={formSettings.age.label}
          inputProps={{ ...formSettings.age.inputProps, ...register('age') }}
          errors={getErrors('age')}
        />
        <FormElementInput
          label={formSettings.email.label}
          inputProps={{
            ...formSettings.email.inputProps,
            ...register('email'),
          }}
          errors={getErrors('email')}
        />
        <FormElementInput
          label={formSettings.password.label}
          inputProps={{
            ...formSettings.password.inputProps,
            ...register('password'),
          }}
          errors={getErrors('password')}
        />
        <FormElementInput
          label={formSettings.confirmPassword.label}
          inputProps={{
            ...formSettings.confirmPassword.inputProps,
            ...register('confirmPassword'),
          }}
          errors={getErrors('confirmPassword')}
        />
        <FormElementRadioCollection
          label={formSettings.gender.label}
          inputProps={{
            ...formSettings.gender.inputProps,
            ...register('gender'),
            setValue: (val: string) =>
              setValue('gender', val, { shouldValidate: true }),
          }}
          radios={formSettings.gender.radios}
          errors={getErrors('gender')}
        />
        <FormElementInput
          label={formSettings.profilePicture.label}
          inputProps={{
            ...formSettings.profilePicture.inputProps,
            ...register('profilePicture'),
          }}
          errors={getErrors('profilePicture')}
        />
        <FormElementAutocomplete
          label={formSettings.country.label}
          inputProps={{
            ...formSettings.country.inputProps,
            ...register('country'),
            setValue: (val: string) =>
              setValue('country', val, { shouldValidate: true }),
          }}
          autocompleteList={countries}
          errors={getErrors('country')}
        />
        <FormElementCheckbox
          label={formSettings.acceptTC.label}
          inputProps={{
            ...formSettings.acceptTC.inputProps,
            ...register('acceptTC'),
          }}
          errors={getErrors('acceptTC')}
        />
        <FormSubmit disabled={!isDirty || !isValid} />
      </form>
    </Layout>
  );
}

export default FormRHF;
