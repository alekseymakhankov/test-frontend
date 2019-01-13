import { SET_CURRENT_USER } from '~constants';
import { createAction } from '~helpers';
import { IFetchedDataItem } from '~types';

export const setCurrentUser = (data: IFetchedDataItem) => {
  return createAction(SET_CURRENT_USER, data);
};
