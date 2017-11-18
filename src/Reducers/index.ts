import { combineReducers } from 'redux';
import FavesReducer, { FavesState } from './FavesReducer';
import UserReducer, { UserState } from './UserReducer';
import StorageReducer, { StorageState } from './StorageReducer';

export default combineReducers({
  faves: FavesReducer,
  user: UserReducer,
  storage: StorageReducer,
});

export interface State {
  faves: FavesState;
  user: UserState;
  storage: StorageState;
}
