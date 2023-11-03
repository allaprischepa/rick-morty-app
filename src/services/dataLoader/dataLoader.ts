import { ICharacterData, IResponse } from '../../types/types';
import { API_ITEMS_PER_PAGE, API_URL } from './settings';

class DataLoader {
  async getData(
    searchTerm = '',
    page = 1,
    itemsPerPage = API_ITEMS_PER_PAGE
  ): Promise<IResponse> {
    if (itemsPerPage === API_ITEMS_PER_PAGE) {
      return this.getSinglePage(searchTerm, page);
    }

    return this.getSeveralPages(searchTerm, page, itemsPerPage);
  }

  private async getSinglePage(searchTerm = '', page = 1): Promise<IResponse> {
    return fetch(`${API_URL}/?page=${page}&name=${searchTerm}`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((data) => ({
        results: data?.results ?? [],
        pages: data?.info?.pages ?? 0,
      }));
  }

  async getCharacterData(id = ''): Promise<ICharacterData> {
    return fetch(`${API_URL}/${id}`).then((res) =>
      res.status === 200 ? res.json() : null
    );
  }

  private async getSeveralPages(
    searchTerm = '',
    page = 1,
    itemsPerPage = API_ITEMS_PER_PAGE
  ): Promise<IResponse> {
    let results: ICharacterData[] = [];
    let pages = 0;
    let totalPages = 0;
    const countOfRequests = itemsPerPage / API_ITEMS_PER_PAGE;
    const startPage = countOfRequests * (page - 1) + 1;
    const endPage = startPage + countOfRequests - 1;

    for (let p = startPage; p <= endPage; p++) {
      if (totalPages && p > totalPages) continue;

      const response = await fetch(`${API_URL}?page=${p}&name=${searchTerm}`);
      const data = await response.json();

      if (data && data.results) {
        results = [...results, ...data.results];
        totalPages = data.info.pages;
        pages = Math.ceil(data.info.pages / countOfRequests);
      }
    }

    return { results, pages };
  }
}

export default DataLoader;
