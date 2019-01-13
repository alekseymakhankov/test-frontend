import { DATA_URL } from '~constants';
import { IFetchedData } from '~types/FetchedData';

export const fetchData = (): Promise<IFetchedData> => {
  return fetch(DATA_URL).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
