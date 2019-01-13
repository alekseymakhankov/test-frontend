import { SET_REMOTE_DATA } from '~constants';
import { createAction } from '~helpers';
import { IFetchedData } from '~types';

export const setRemoteData = (data: IFetchedData) => {
  return createAction(SET_REMOTE_DATA, data);
};
