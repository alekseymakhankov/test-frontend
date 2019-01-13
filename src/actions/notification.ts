import { OPEN_NOTIFICATION_BAR, CLOSE_NOTIFICATION_BAR } from '~constants';
import { createAction } from '~helpers';

export const openNotificationBar = (title: string, message?: string, isError?: boolean) => {
  return createAction(OPEN_NOTIFICATION_BAR, { title, message, isError });
};

export const closeNotificationBar = () => {
  return createAction(CLOSE_NOTIFICATION_BAR);
};
