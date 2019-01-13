import { IFetchedData, IFetchedDataItem } from '~types';

export const getUserById = (
  id: number,
  data: IFetchedData,
): IFetchedDataItem | null => {
  return data.Brastlewark.find(item => item.id === id) || null;
};
