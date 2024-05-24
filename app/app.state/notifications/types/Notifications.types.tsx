import { type FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { type UpdateReducerState } from '@utils';
import { type AlarmsType } from '@state';

/** Notifications State Context */

type NotificationsContextValue = NotificationsState & {
    updateState: UpdateReducerState<NotificationsReducerEvent>;
};

type NotificationsState = {
    status: FirebaseMessagingTypes.AuthorizationStatus;
    data: NotificationData[];
};

type NotificationData = {
    title: string;
    message: string;
    alarm: AlarmsType.AlarmModel;
};

/** Notifications Reducer */

type NotificationsReducerEvent =
    | {
          type: 'UPDATE_STATUS';
          payload: FirebaseMessagingTypes.AuthorizationStatus;
      }
    | {
          type: 'UPDATE_NOTIFICATION_DATA';
          payload: NotificationData;
      }
    | {
          type: 'REMOVE_NOTIFICATION';
          payload: { alarm_id: number };
      };

/** Notifications Reducer */

export type {
    NotificationsContextValue,
    NotificationsState,
    NotificationData,
    NotificationsReducerEvent,
};
