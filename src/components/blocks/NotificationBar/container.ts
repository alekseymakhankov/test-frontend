import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IStateProps } from '~/reducers';
import { IAction } from '~/types';
import { closeNotificationBar } from '~actions';

import NotificationBar from './NotificationBar';

import { IMapStateToProps, IMapDispatchToProps } from './types';

export const mapStateToProps = (state: IStateProps): IMapStateToProps => {
  return state.notificationBar;
};

export const mapDispatchToProps = (dispatch: Dispatch<IAction>): IMapDispatchToProps => {
  return {
    closeNotificationBar: () => {
      return dispatch(closeNotificationBar());
    },
  };
};

export default compose<any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(NotificationBar);
