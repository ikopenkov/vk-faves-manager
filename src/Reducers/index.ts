import { combineReducers } from 'redux';
import FavesReducer from './FavesReducer';

export default combineReducers({
  faves: FavesReducer,
});
