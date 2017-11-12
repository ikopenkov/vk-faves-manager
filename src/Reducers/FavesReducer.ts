import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { loadingFaves, loadingFavesFailed, loadingFavesSucceeded } from '../Actions/ActionCreators';
import { handleActions } from 'redux-actions';

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
    [loadingFaves.toString()]: () => '1',
    [loadingFavesSucceeded.toString()]: () => '2',
    [loadingFavesFailed.toString()]: () => '3',
  },
  'default'
);

const loaded = handleActions(
  {
    [loadingFaves.toString()]: () => '1',
    [loadingFavesSucceeded.toString()]: () => '2',
    [loadingFavesFailed.toString()]: () => '3',
  },
  'default'
);

const list = handleActions(
  {
    [loadingFaves.toString()]: () => ['nedef'],
  },
  ['def']
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

const selectIsLoading = createSelector(selectFaves, favesState => favesState.loading);

const selectIsLoaded = createSelector(selectFaves, favesState => favesState.loaded);

const selectFavesList = createSelector(selectFaves, favesState => favesState.list);

export { selectIsLoading, selectIsLoaded, selectFavesList };
