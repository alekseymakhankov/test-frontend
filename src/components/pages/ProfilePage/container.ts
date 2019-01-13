import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IStateProps } from '~reducers';
import { IAction, IFetchedData, IFetchedDataItem } from '~types';
import { setRemoteData, setCurrentUser, openNotificationBar } from '~actions';

import ProfilePage from './ProfilePage';

import { IMapStateToProps, IMapDispatchToProps } from './types';

export const mapStateToProps = (state: IStateProps): IMapStateToProps => {
  return {
    remoteData: state.remoteData.remoteData,
    currentUser: state.remoteData.currentUser,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<IAction>): IMapDispatchToProps => {
  return {
    onSetRemoteData: (data: IFetchedData) => {
      return dispatch(setRemoteData(data));
    },
    onSetCurrentUser: (item: IFetchedDataItem) => {
      return dispatch(setCurrentUser(item));
    },
    openNotificationBar: (title: string, message?: string, isError?: boolean) => {
      return dispatch(openNotificationBar(title, message, isError));
    },
  };
};

export default compose<any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ProfilePage);
