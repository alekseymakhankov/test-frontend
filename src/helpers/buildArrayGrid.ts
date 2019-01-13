import { IFetchedData, IFetchedDataItem } from '~/types';

export const buildImageGrid = (
  data: IFetchedData,
  columns: number = 3,
): IFetchedDataItem[][] => {
  const result = [];
  const imageCount = Math.ceil(data.Brastlewark.length / 3);
  for (let i = 0; i < columns - 1; i += 1) {
    result.push(data.Brastlewark.slice(i * imageCount, i * imageCount + imageCount));
  }
  result.push(data.Brastlewark.slice((columns - 1) * imageCount, data.Brastlewark.length));
  return result;
};
