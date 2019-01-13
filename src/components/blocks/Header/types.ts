import { RouteComponentProps } from 'react-router-dom';
import { IResolvedFetchedDataItem } from '~types';

export interface IComponentProps {
  currentUser?: IResolvedFetchedDataItem | null;
}

export interface IMapStateToProps {
  filterValue: string;
}

export interface IMapDispatchToProps {
  onSetFilterValue: (value: string) => any;
}

export interface IRouterProps {}

export type TRouterProps = RouteComponentProps<IRouterProps>;

export type ICommonComponentProps =
  IComponentProps &
  IMapStateToProps &
  IMapDispatchToProps &
  TRouterProps;

export interface IComponentState {}
