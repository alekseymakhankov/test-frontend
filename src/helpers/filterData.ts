import { IFetchedDataItem, IFetchedData, FetchedItemFieldName } from '~types';
import { normalizeString } from './';

export const matchInArray = (collection: string[], value: string) => {
  return collection.some(item => normalizeString(item).includes(normalizeString(value)));
};

export const matchInString = (source: string, value: string) => {
  return normalizeString(source).includes(normalizeString(value));
};

export const filterByField = (value: string) => {
  return (item: IFetchedDataItem) => {
    return Object.keys(item).some((key: string) => {
      const field = item[key as FetchedItemFieldName];
      if (!field) {
        return true;
      }
      if (Array.isArray(field)) {
        return matchInArray(field, value);
      }
      return matchInString(`${field}`, value);
    });
  };
};

export const filterData = (data: IFetchedData, value: string) => {
  return data.Brastlewark.filter(filterByField(value));
};
