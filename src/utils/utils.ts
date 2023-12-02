export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

export const toBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || null);
    reader.onerror = () => reject(null);
  });
};

export const capitilize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
