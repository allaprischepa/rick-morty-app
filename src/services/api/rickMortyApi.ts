import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ITEMS_PER_PAGE, API_URL } from './settings';
import { APIResponse, CharacterData, Response } from '../../types/types';
import { HYDRATE } from 'next-redux-wrapper';

interface QueryArgs {
  searchTerm?: string;
  page?: number;
  itemsPerPage?: number;
}

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getDataByPage: builder.query<APIResponse, QueryArgs>({
      query: ({ searchTerm = '', page = 1 }) =>
        `?page=${page}&name=${searchTerm}`,
    }),

    getData: builder.query<Response, QueryArgs>({
      async queryFn(
        { searchTerm = '', page = 1, itemsPerPage = API_ITEMS_PER_PAGE },
        _queryApi,
        _extraOptions,
        fetchBQ
      ) {
        let results: CharacterData[] = [];
        let pages = 0;
        let totalPages = 0;
        const countOfRequests = itemsPerPage / API_ITEMS_PER_PAGE;
        const startPage = countOfRequests * (page - 1) + 1;
        const endPage = startPage + countOfRequests - 1;

        for (let p = startPage; p <= endPage; p++) {
          if (totalPages && p > totalPages) break;

          const url = `?page=${p}&name=${searchTerm}`;
          const res = await fetchBQ({ url });
          const data = res.data as APIResponse;

          if (!data) break;

          if (data.results) {
            results = [...results, ...data.results];
            totalPages = data.info.pages;
            pages = Math.ceil(data.info.pages / countOfRequests);
          }
        }

        return { data: { results, pages } };
      },
    }),

    getCharacterData: builder.query<CharacterData, string>({
      query: (id = '') => `/${id}`,
    }),
  }),
});

export const { useGetDataQuery, useGetCharacterDataQuery } = rickMortyApi;

export const rickMortyApiReducer = rickMortyApi.reducer;
