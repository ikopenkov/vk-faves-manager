import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import {
  loadingFaves,
  loadingFavesFailed,
  loadingFavesSucceeded,
  importingFaves,
  importingFavesFailed,
  importingFavesSucceeded,
} from '../Actions/ActionCreators';
import { handleActions, Action } from 'redux-actions';
import { FavePostProps } from '../Backend/Models';
import { State } from './index';

const importing = handleActions(
  {
    [importingFaves.toString()]: () => true,
    [importingFavesSucceeded.toString()]: () => false,
    [importingFavesFailed.toString()]: () => false,
  },
  false
);

const imported = handleActions(
  {
    [importingFaves.toString()]: () => false,
    [importingFavesSucceeded.toString()]: () => true,
    [importingFavesFailed.toString()]: () => false,
  },
  false
);

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
    [loadingFavesSucceeded.toString()]: (_, action: Action<FavePostProps[]>) => {
      return action.payload.slice();
    },
  },
  []
);

const faves = combineReducers({
  importing,
  imported,
  loading,
  loaded,
  list,
});

export default faves;

const selectFaves = (state: State) => state.faves;

export const selectIsImporting = createSelector(selectFaves, favesState => favesState.importing);
export const selectIsImported = createSelector(selectFaves, favesState => favesState.imported);

export const selectIsLoading = createSelector(selectFaves, favesState => favesState.loading);
export const selectIsLoaded = createSelector(selectFaves, favesState => favesState.loaded);

export const selectFavesList = createSelector(selectFaves, favesState => favesState.list);

export const selectHasFaves = createSelector(selectFavesList, favesList => !!favesList.length);

export interface FavesState {
  loading: boolean;
  loaded: boolean;
  importing: boolean;
  imported: boolean;
  list: FavePostProps[];
}
