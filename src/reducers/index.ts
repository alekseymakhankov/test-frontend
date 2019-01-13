import { combineReducers } from 'redux';

import remoteData, { IRemoteDataReducer } from './remoteData';
import notificationBar, { INotificationBarReducer } from './notificationBar';

export interface IStateProps {
  remoteData: IRemoteDataReducer;
  notificationBar: INotificationBarReducer;
}

export default combineReducers<IStateProps>({
  remoteData,
  notificationBar,
});
