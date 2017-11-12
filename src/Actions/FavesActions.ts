// import * as api from '../';
// import Notifications from 'react-notification-system-redux';
import {
  loadingFaves,
  // loadingFavesFailed,
  // loadingFavesSucceeded,
} from './ActionCreators';

// const onError = (error, dispatch, errorAction) => {
//   dispatch(errorAction(error));
//   dispatch(Notifications.show({
//     message: 'Сервер временно недоступен',
//     autoDismiss: 3,
//   }, 'error'));
// };

export const loadFaves = () => dispatch => dispatch(loadingFaves());
export type loadFaves = () => void;