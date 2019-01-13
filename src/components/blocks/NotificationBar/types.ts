export interface IComponentProps {}

export interface IMapStateToProps {
  isNotificationBarOpened: boolean;
  title?: string;
  message?: string;
  isError?: boolean;
}

export interface IMapDispatchToProps {
  closeNotificationBar: () => any;
}

export type ICommonComponentProps =
  IComponentProps &
  IMapStateToProps &
  IMapDispatchToProps;

export interface IComponentState {
  isVisible: boolean;
}
