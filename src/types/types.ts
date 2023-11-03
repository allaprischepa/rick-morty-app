import { ReactNode } from 'react';

export interface IProps {
  children?: ReactNode;
}

export interface ICharacterData {
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
  episode: string[];
  url: string;
  created: string;
}

export interface IResponse {
  results: ICharacterData[];
  pages: number;
}
