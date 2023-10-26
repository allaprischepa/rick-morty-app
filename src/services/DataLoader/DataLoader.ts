import { ICharacterData } from '../../types/types';
import { API_URL } from './settings';

class DataLoader {
  getData(searchTerm = ''): Promise<ICharacterData[] | null> {
    return searchTerm
      ? this.getDataFromFirstPage(searchTerm)
      : this.getAllData();
  }

  private getDataFromFirstPage(
    searchTerm: string
  ): Promise<ICharacterData[] | null> {
    return fetch(`${API_URL}/?page=1&name=${searchTerm}`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((data) => (data?.results ? data.results : null));
  }

  private async getAllData(): Promise<ICharacterData[] | null> {
    let allCharacters: ICharacterData[] = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const response = await fetch(`${API_URL}?page=${page}`);
      const data = await response.json();

      if (data && data.results) {
        allCharacters = [...allCharacters, ...data.results];
        totalPages = data.info.pages;
      }

      page++;
    }

    return allCharacters ? allCharacters : null;
  }
}

export default DataLoader;
