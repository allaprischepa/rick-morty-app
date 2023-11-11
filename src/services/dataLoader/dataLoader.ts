import { CharacterData, Response } from '../../types/types';
import { API_ITEMS_PER_PAGE, API_URL, httpStatus } from './settings';

class DataLoader {
  async getData(
    searchTerm = '',
    page = 1,
    itemsPerPage = API_ITEMS_PER_PAGE
  ): Promise<Response> {
    if (itemsPerPage === API_ITEMS_PER_PAGE) {
      return this.getSinglePage(searchTerm, page);
    }

    return this.getSeveralPages(searchTerm, page, itemsPerPage);
  }

  private async getSinglePage(searchTerm = '', page = 1): Promise<Response> {
    return this.fetchData(`${API_URL}/?page=${page}&name=${searchTerm}`).then(
      (data) => ({
        results: data?.results ?? [],
        pages: data?.info?.pages ?? 0,
      })
    );
  }

  async getCharacterData(id = ''): Promise<CharacterData> {
    return this.fetchData(`${API_URL}/${id}`);
  }

  private async getSeveralPages(
    searchTerm = '',
    page = 1,
    itemsPerPage = API_ITEMS_PER_PAGE
  ): Promise<Response> {
    let results: CharacterData[] = [];
    let pages = 0;
    let totalPages = 0;
    const countOfRequests = itemsPerPage / API_ITEMS_PER_PAGE;
    const startPage = countOfRequests * (page - 1) + 1;
    const endPage = startPage + countOfRequests - 1;

    for (let p = startPage; p <= endPage; p++) {
      if (totalPages && p > totalPages) break;

      const url = `${API_URL}?page=${p}&name=${searchTerm}`;
      const data = await this.fetchData(url);

      if (!data) break;

      if (data.results) {
        results = [...results, ...data.results];
        totalPages = data.info.pages;
        pages = Math.ceil(data.info.pages / countOfRequests);
      }
    }

    return { results, pages };
  }

  private async fetchData(url: string) {
    return fetch(url)
      .then((res) => {
        if (res.status === httpStatus.OK) return res.json();
        if (res.status === httpStatus.NOT_FOUND) return;

        throw new Error(`HTTP Error occured. Status: ${res.status}`);
      })
      .catch((error) => {
        console.error('Some error occured due to fetch operation:', error);

        throw error;
      });
  }
}

export default DataLoader;
