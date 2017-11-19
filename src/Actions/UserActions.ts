import { setTokenAction, unsetTokenAction } from './ActionCreators';
import { selectStorageInstance } from '../Reducers/StorageReducer';

export const loadStoredToken = () => (dispatch, getState): Promise<string> => {
  const storage = selectStorageInstance(getState());

  return storage
    .load({
      key: 'token',
    })
    .then((token: string) => {
      dispatch(setTokenAction(token));
      return token;
    })
    .catch((error: string) => {
      console.log('no token stored');
      return error;
    });
};

export const clearStoredToken = () => (dispatch, getState) => {
  const storage = selectStorageInstance(getState());

  return storage
    .remove({
      key: 'token',
    })
    .then(() => {
      dispatch(unsetTokenAction());
    })
    .catch(() => {
      console.log('some clear stored token error');
    });
};

export const setToken = (token: string) => (dispatch, getState) => {
  const storage = selectStorageInstance(getState());
  storage.save({
    key: 'token',
    data: token,
  });

  return dispatch(setTokenAction(token));
};
export type setToken = (token: string) => void;

export const unsetToken = () => dispatch => dispatch(unsetTokenAction());
export type unsetToken = () => void;

export interface Types {
  setToken(token: string): void;
  unsetToken(): void;
}
