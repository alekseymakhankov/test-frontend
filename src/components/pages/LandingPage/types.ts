import { RouteComponentProps } from 'react-router-dom';
import { IFetchedData, IFetchedDataItem } from '~/types';

export interface IComponentProps {}

export interface IMapStateToProps {
  remoteData: IFetchedData | null;
}

export interface IMapDispatchToProps {
  onSetRemoteData: (data: IFetchedData) => any;
  onSetCurrentUser: (item: IFetchedDataItem) => any;
  openNotificationBar: (title: string, message?: string, isError?: boolean) => any;
}

export interface IRouterProps {}

export type TRouterProps = RouteComponentProps<IRouterProps>;

export type ICommonComponentProps =
  IComponentProps &
  IMapStateToProps &
  IMapDispatchToProps &
  TRouterProps;

export interface IComponentState {
  isDataLoading: boolean;
}
