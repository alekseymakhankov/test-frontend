import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IStateProps } from '~/reducers';
import { IAction } from '~/types';
import { setFilterValue } from '~/actions';

import Header from './Header';

import { IMapStateToProps, IMapDispatchToProps } from './types';

export const mapStateToProps = (state: IStateProps): IMapStateToProps => {
  return {
    filterValue: state.remoteData.filterValue,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<IAction>): IMapDispatchToProps => {
  return {
    onSetFilterValue: (value: string) => {
      return dispatch(setFilterValue(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
