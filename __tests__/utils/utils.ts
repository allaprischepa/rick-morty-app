import { CharacterData } from '../../src/types/types';

const characterDataMock: CharacterData[] = [
  {
    id: 1,
    name: 'Vivamus',
    status: 'Maecenas',
    species: 'Ut',
    type: 'Sed',
    gender: 'Cras',
    origin: {
      name: 'Fusce',
      url: 'Fusce',
    },
    location: {
      name: 'Praesent',
      url: 'Vestibulum',
    },
    image: 'Phasellus',
  },
];

export const getCharactersArray = (length: number) => {
  return Array.from(Array(length), (_, ind) =>
    Object.assign({}, ...characterDataMock, { id: ind + 1 })
  );
};

export const getRandomCharactersArray = () => {
  const length = Math.ceil(Math.random() * 100 + 30);
  return Array.from(Array(length), (_, ind) =>
    Object.assign({}, ...characterDataMock, { id: ind + 1 })
  );
};
