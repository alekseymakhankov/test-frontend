import { SET_FILTER_VALUE } from '~constants';
import { createAction } from '~helpers';

export const setFilterValue = (value: string) => {
  return createAction(SET_FILTER_VALUE, value);
};
