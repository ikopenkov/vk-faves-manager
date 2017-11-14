import { combineReducers } from 'redux';
import FavesReducer, { FavesState } from './FavesReducer';
import UserReducer, { UserState } from './UserReducer';

export default combineReducers({
  faves: FavesReducer,
  user: UserReducer,
});

export interface State {
  faves: FavesState;
  user: UserState;
}
