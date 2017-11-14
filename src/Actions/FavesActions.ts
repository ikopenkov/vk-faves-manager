// import * as api from '../';
// import Notifications from 'react-notification-system-redux';
import {
  loadingFaves,
  loadingFavesFailed,
  loadingFavesSucceeded,
} from './ActionCreators';
// import { selectIsLoading, selectIsLoaded } from '../Reducers/FavesReducer';
import { selectToken } from '../Reducers/UserReducer';
// const onError = (error, dispatch, errorAction) => {
//   dispatch(errorAction(error));
//   dispatch(Notifications.show({
//     message: 'Сервер временно недоступен',
//     autoDismiss: 3,
//   }, 'error'));
// };
import * as FavesApi from '../api/FavesApi';

export const loadFaves = () => (dispatch, getState): Promise<FavesApi.Fave[]> => {
  dispatch(loadingFaves());
  const token = selectToken(getState());
  if (!token) {
    throw 'Trying load faves without token';
  }
  return FavesApi.loadFaves(token).then(response => {
    console.log('response', response);
    return dispatch(loadingFavesSucceeded(response.response.items));
  })
  .catch(() => dispatch(loadingFavesFailed()));
};

// export const loadSettings = () => (dispatch, getState) => {
//   if (selectLoading(getState())) {
//     return Promise.resolve();
//   }

//   dispatch(loadingSettings());
//   return api.loadSettings().then(
//     response => dispatch(loadingSettingsSucceeded(response)),
//     error => dispatch(loadingSettingsFailed(error))
//   );
// };
