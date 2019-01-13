import * as React from 'react';
import { ICommonComponentProps, IComponentState } from './types';
import { DEFAULT_NOTIFICATION_BAR_CLOSE_TIMEOUT } from '~constants';
import { classnames } from '~helpers';
import './style.scss';

class NotificationBar extends React.Component<ICommonComponentProps, IComponentState> {

  constructor(props: ICommonComponentProps) {
    super(props);
    this.state = {
      isVisible: props.isNotificationBarOpened,
    };
  }

  static getDerivedStateFromProps(nextProps: ICommonComponentProps): IComponentState {
    return {
      isVisible: nextProps.isNotificationBarOpened,
    };
  }

  componentDidUpdate() {
    const { isVisible } = this.state;
    const { closeNotificationBar } = this.props;

    if (isVisible) {
      const timeout = setTimeout(
        () => {
          clearTimeout(timeout);
          closeNotificationBar();
        },
        DEFAULT_NOTIFICATION_BAR_CLOSE_TIMEOUT,
      );
    }
  }

  render() {
    const { isVisible } = this.state;
    const { title, message, isError = false, closeNotificationBar } = this.props;
    const classes = classnames({
      'notification-bar-wrapper': true,
      visible: isVisible,
      error: isError,
    });
    return (
      <div
        className={classes}
      >
        <div className="title-wrapper">
          <div className="title">{title}</div>
          <div
            className="close-icon"
            onClick={() => closeNotificationBar()}
          />
        </div>
        <div className="message">{message}</div>
      </div>
    );
  }
}

export default NotificationBar;
