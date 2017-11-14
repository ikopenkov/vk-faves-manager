import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { setTokenAction, unsetTokenAction } from '../Actions/ActionCreators';
import { handleActions, Action } from 'redux-actions';
import { State } from './index';

const isTokenSet = handleActions(
  {
    [setTokenAction.toString()]: () => true,
    [unsetTokenAction.toString()]: () => false,
  },
  false
);

const token = handleActions(
  {
    [setTokenAction.toString()]: (state: State, action: Action<string>) => {
      console.log('AAAAAaaaaAAAAA');
      
      console.log('asdfsad', action, state);
      return action.payload;
    },
    [unsetTokenAction.toString()]: () => null,
  },
  null
);

const user = combineReducers({
  isTokenSet,
  token,
});

export default user;

const selectUser = state => state.user;

export const selectIsTokenSet = createSelector(selectUser, userState => userState.isTokenSet);
export const selectToken = createSelector(selectUser, userState => userState.token);

export interface UserState {
  isTokenSet: boolean;
  token?: string;
}
