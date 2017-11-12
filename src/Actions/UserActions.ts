// import * as api from '../';
// import Notifications from 'react-notification-system-redux';
import {
  // loadingFeed,
  // loadingFeedSucceeded,
  // loadingFeedFailed,
  setTokenAction,
  unsetTokenAction,
} from './ActionCreators';

// const onError = (error, dispatch, errorAction) => {
//   dispatch(errorAction(error));
//   dispatch(Notifications.show({
//     message: 'Сервер временно недоступен',
//     autoDismiss: 3,
//   }, 'error'));
// };

export const setToken = (token: string) => dispatch => dispatch(setTokenAction(token));
export type setToken = (token: string) => void;

export const unsetToken = () => dispatch => dispatch(unsetTokenAction());
export type unsetToken = () => void;

export interface Types {
  setToken(token: string): void;
  unsetToken(): void;
}
