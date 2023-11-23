export interface CharacterData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
}

export interface APIResponse {
  results: CharacterData[];
  info: {
    count: number;
    pages: number;
  };
}

export interface Response {
  results: CharacterData[];
  pages: number;
}
