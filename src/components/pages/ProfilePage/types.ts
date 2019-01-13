import { RouteComponentProps } from 'react-router-dom';
import { IFetchedData, IResolvedFetchedDataItem, IFetchedDataItem } from '~/types';

export interface IComponentProps {}

export interface IMapStateToProps {
  remoteData: IFetchedData | null;
  currentUser: IResolvedFetchedDataItem | null;
}

export interface IMapDispatchToProps {
  onSetRemoteData: (data: IFetchedData) => any;
  onSetCurrentUser: (item: IFetchedDataItem) => any;
  openNotificationBar: (title: string, message?: string, isError?: boolean) => any;
}

export interface IRouterProps {
  id?: string;
}

export type TRouterProps = RouteComponentProps<IRouterProps>;

export type ICommonComponentProps =
  IComponentProps &
  IMapStateToProps &
  IMapDispatchToProps &
  TRouterProps;

export interface IComponentState {
  imageWidth: number;
  user: IResolvedFetchedDataItem | null;
}
