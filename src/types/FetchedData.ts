export interface IFetchedDataItem {
  age : number;
  friends : string[];
  hair_color : string;
  height : number;
  weight : number;
  id : number;
  name : string;
  professions : string[];
  thumbnail : string;
}

export interface IResolvedFetchedDataItem {
  age : number;
  friends : IFetchedDataItem[];
  hair_color : string;
  height : number;
  weight : number;
  id : number;
  name : string;
  professions : string[];
  thumbnail : string;
}

export interface IFetchedData {
  Brastlewark: IFetchedDataItem[];
}

export type FetchedItemFieldName = 'age'
  | 'friends'
  | 'hair_color'
  | 'height'
  | 'weight'
  | 'id'
  | 'name'
  | 'professions'
  | 'thumbnail';
