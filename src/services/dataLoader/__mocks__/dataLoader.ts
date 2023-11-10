import { CharacterData } from '../../../types/types';

const characterDataMock: CharacterData[] = [
  {
    id: 1,
    name: 'Character Name',
    status: 'Status',
    species: 'Species',
    type: 'Type',
    gender: 'Gender',
    origin: {
      name: 'Name of origin',
      url: 'origin_url',
    },
    location: {
      name: 'Name of location',
      url: 'location_url',
    },
    image: 'image_url',
    episode: [],
    url: 'url',
    created: 'created',
  },
];

const getCharactersArray = (length: number) => {
  return Array.from(Array(length), (_, ind) =>
    Object.assign({}, ...characterDataMock, { id: ind + 1 })
  );
};

class DataLoader {
  private static totalAmount: number = 0;

  static setTotalAmount(amount: number) {
    DataLoader.totalAmount = amount;
  }

  async getData(searchTerm: string, page: number, itemsPerPage: number) {
    const characters = getCharactersArray(DataLoader.totalAmount);
    const pagesCount = Math.ceil(characters.length / itemsPerPage);

    return {
      results: characters,
      pages: pagesCount,
    };
  }
}

export default DataLoader;
