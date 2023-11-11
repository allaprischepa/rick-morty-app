import { CharacterData } from '../../../types/types';

class DataLoader {
  private static results: CharacterData[] = [];

  static setResults(results: CharacterData[]) {
    DataLoader.results = results;
  }

  async getData(searchTerm: string, page: number, itemsPerPage: number) {
    const characters = DataLoader.results;
    const pagesCount = Math.ceil(characters.length / itemsPerPage);

    return {
      results: characters,
      pages: pagesCount,
    };
  }

  async getCharacterData(id: string): Promise<CharacterData> {
    const characters = DataLoader.results;
    const foundCharacters = characters.filter((c) => `${c.id}` === id);

    return foundCharacters[0];
  }
}

export default DataLoader;
