import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { loadingFaves, loadingFavesFailed, loadingFavesSucceeded } from '../Actions/ActionCreators';
import { handleActions, Action } from 'redux-actions';
import { Fave } from '../api/FavesApi';
// import { State } from './index';


// const initialState = {
//   list: [],
//   isLoading: false,
//   isLoaded: false,
// };

// const loading = handleActions(
//   {
//     [loadingFaves.toString()]: () => true,
//     [loadingFavesSucceeded.toString()]: () => false,
//     [loadingFavesFailed.toString()]: () => false,
//   },
//   false
// );

const loading = handleActions(
  {
    [loadingFaves.toString()]: () => true,
    [loadingFavesSucceeded.toString()]: () => false,
    [loadingFavesFailed.toString()]: () => false,
  },
  false
);

const loaded = handleActions(
  {
    [loadingFaves.toString()]: () => false,
    [loadingFavesSucceeded.toString()]: () => true,
    [loadingFavesFailed.toString()]: () => false,
  },
  false
);

const list = handleActions(
  {
    [loadingFavesSucceeded.toString()]: (_, action: Action<Fave[]>) => {
      return action.payload.slice();
    },
  },
  []
);

// export default (state = initialState) => {
//   return state;
// };

const faves = combineReducers({
  loading,
  loaded,
  list,
});

export default faves;

const selectFaves = state => state.faves;

export const selectIsLoading = createSelector(selectFaves, favesState => favesState.loading);

export const selectIsLoaded = createSelector(selectFaves, favesState => favesState.loaded);

export const selectFavesList = createSelector(selectFaves, favesState => favesState.list);

export interface FavesState {
  loading: boolean;
  loaded: boolean;
  list: any[];
}
