import { AnyAction } from 'redux';

import {
  SET_REMOTE_DATA,
  SET_FILTER_VALUE,
  SET_CURRENT_USER,
} from '~/constants';

import { filterData, resolveUserFriends } from '~helpers';
import { IFetchedData, IResolvedFetchedDataItem } from '~/types';

export interface IRemoteDataReducer {
  remoteData: IFetchedData | null;
  remoteReadOnlyData: IFetchedData | null;
  filterValue: string;
  currentUser: IResolvedFetchedDataItem | null;
}

const initialState: IRemoteDataReducer = {
  remoteData: null,
  currentUser: null,
  remoteReadOnlyData: null,
  filterValue: '',
};

export default function reducer(
  state: IRemoteDataReducer = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case SET_REMOTE_DATA:
      return Object.assign({}, state, {
        remoteData: action.payload,
        remoteReadOnlyData: action.payload,
      });

    case SET_FILTER_VALUE: {
      if (!state.remoteReadOnlyData) {
        return state;
      }
      if (!action.payload) {
        return state;
      }
      if (action.payload) {
        return Object.assign({}, state, {
          remoteData: {
            Brastlewark: filterData(
              state.remoteReadOnlyData,
              action.payload,
            ),
          },
        });
      }
      return state;
    }

    case SET_CURRENT_USER: {
      if (action.payload && state.remoteReadOnlyData) {
        const resolvedUser = resolveUserFriends(action.payload, state.remoteReadOnlyData);
        return Object.assign({}, state, { currentUser: resolvedUser });
      }
      return state;
    }

    default: return state;
  }
}
