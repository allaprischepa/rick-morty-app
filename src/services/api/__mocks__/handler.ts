import { http, HttpHandler, HttpResponse } from 'msw';
import { API_ITEMS_PER_PAGE, API_URL } from '../settings';
import { CharacterData } from '../../../types/types';

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

export const getHandlersByMockedArray = (
  arr: CharacterData[]
): HttpHandler[] => {
  return [
    http.get(`${API_URL}`, ({ request }) => {
      const url = new URL(request.url);
      const page = url.searchParams.get('page');

      if (!arr) return new HttpResponse(null, { status: 404 });

      let results = arr;

      if (page) {
        const startIndex = (+page - 1) * API_ITEMS_PER_PAGE;
        const endIndex = startIndex + API_ITEMS_PER_PAGE;
        results = arr.slice(startIndex, endIndex);
      }

      return HttpResponse.json({
        results: results,
        info: {
          pages: Math.ceil(arr.length / API_ITEMS_PER_PAGE),
        },
      });
    }),

    http.get(`${API_URL}/:id`, ({ params }) => {
      const { id } = params;

      const filteredArr = arr.filter((characterObj) => +id === characterObj.id);
      const character = filteredArr.pop();

      if (character) return HttpResponse.json(character);

      return new HttpResponse(null, { status: 404 });
    }),
  ];
};

const defaultMockedArray = getCharactersArray(API_ITEMS_PER_PAGE * 5);
export const handlers = getHandlersByMockedArray(defaultMockedArray);
