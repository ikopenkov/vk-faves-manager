import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
// import { setTokenAction, unsetTokenAction } from '../Actions/ActionCreators';
// import { handleActions, Action } from 'redux-actions';
import { State } from './index';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const STORAGE = new Storage({
  // maximum capacity, default 1000
  size: 1000,

  // Use AsyncStorage for RN, or window.localStorage for web.
  // If not set, data would be lost after reload.
  storageBackend: AsyncStorage,

  // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired,
  // the corresponding sync method will be invoked and return
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

// const isTokenSet = handleActions(
//   {
//     [setTokenAction.toString()]: () => true,
//     [unsetTokenAction.toString()]: () => false,
//   },
//   false
// );

const storageInstance = () => STORAGE;

const storage = combineReducers({
  storageInstance,
});

export default storage;

const selectStorage = (state: State) => state.storage;

export const selectStorageInstance: (state: State) => StorageInstance = createSelector(
  selectStorage,
  storageState => storageState.storageInstance
);
// export const selectToken = createSelector(selectUser, userState => userState.token);

export interface StorageState {
  storageInstance: Storage;
}

export interface StorageInstance {
  save(params: SaveParams): void;
  load: StorageLoad<any>;
}

export type StorageLoad<T> = (params: LoadParams) => Promise<T>;

interface SaveParams {
  key: string;
  data: any;
  expires?: number;
}

interface LoadParams {
  key: string;

  // autoSync(default true) means if data not found or expired,
  // then invoke the corresponding sync method
  autoSync?: boolean;

  // syncInBackground(default true) means if data expired,
  // return the outdated data first while invoke the sync method.
  // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
  syncInBackground?: boolean;

  // you can pass extra params to sync method
  // see sync example below for example
  syncParams?: {
    [Symbol.toStringTag]: any;
  };
}
