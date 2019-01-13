import { AnyAction } from 'redux';

import {
  OPEN_NOTIFICATION_BAR,
  CLOSE_NOTIFICATION_BAR,
} from '~/constants';

export interface INotificationBarReducer {
  isNotificationBarOpened: boolean;
  title?: string;
  message?: string;
  isError?: boolean;
}

const initialState: INotificationBarReducer = {
  isNotificationBarOpened: false,
  title: '',
  message: '',
  isError: false,
};

export default function reducer(
  state: INotificationBarReducer = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case OPEN_NOTIFICATION_BAR:
      return Object.assign({}, state, {
        isNotificationBarOpened: true,
        title: action.payload.title,
        message: action.payload.message,
        isError: action.payload.isError,
      });

    case CLOSE_NOTIFICATION_BAR:
      return Object.assign({}, state, {
        isNotificationBarOpened: false,
        title: '',
        message: '',
        isError: false,
      });

    default: return state;
  }
}
