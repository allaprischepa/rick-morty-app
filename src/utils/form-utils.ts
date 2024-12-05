import { add } from '../state/data/dataSlice';
import { store } from '../state/store';
import { FormDataToSave, FormDataWithUndefined } from './types';
import { toBase64 } from './utils';

export const saveData = (data: FormDataToSave) => {
  store.dispatch(add(data));
};

export const transformFormData = async (data: FormDataWithUndefined) => {
  const { profilePicture, ...rest } = data;
  const file = profilePicture instanceof FileList ? profilePicture[0] : null;
  const transformedPicture = file ? await toBase64(file) : null;

  return {
    ...rest,
    profilePicture: transformedPicture ?? '',
  };
};
