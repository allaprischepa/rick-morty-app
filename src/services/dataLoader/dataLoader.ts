import { ICharacterData, IResponse } from '../../types/types';
import { API_URL } from './settings';

class DataLoader {
  async getData(searchTerm = '', page = 1): Promise<IResponse> {
    return fetch(`${API_URL}/?page=${page}&name=${searchTerm}`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((data) => ({
        results: data?.results ?? [],
        count: data?.info?.count ?? 0,
        pages: data?.info?.pages ?? 0,
      }));
  }

  async getCharacterData(id = ''): Promise<ICharacterData> {
    return fetch(`${API_URL}/${id}`).then((res) =>
      res.status === 200 ? res.json() : null
    );
  }

  private getDataFromFirstPage(searchTerm: string): Promise<ICharacterData[]> {
    return fetch(`${API_URL}/?page=1&name=${searchTerm}`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((data) => (data?.results ? data.results : []));
  }

  private async getAllData(): Promise<ICharacterData[]> {
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

    return allCharacters;
  }
}

export default DataLoader;
