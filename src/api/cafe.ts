import { Cafe } from '../Types/Cafe';
import { client } from './wait';

export const getCafes = () => {
  return client.get<Cafe[]>('/cafes');
};

export const getFavourites = () => {
  return client.get<Cafe[]>('/users/favorites');
};

export const getFilteredCafes = (url: string) => {
  return client.get<Cafe[]>(`/cafes/search?${url}`);
};

export const getCafe = (id: number) => {
  return client.get<Cafe>(`/cafes/${id}`);
};

export const addToFavourites = (id: number) => {
  return client.post<Cafe>(`/users/favorites/${id}`);
};

export const deleteFromFavourites = (id: number) => {
  return client.delete(`/users/favorites/${id}`);
};
