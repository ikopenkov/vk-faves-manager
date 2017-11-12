import { createSelector } from 'reselect';

const initialState = {
  list: [],
  isLoading: false,
  isLoaded: false,
};

export default (state = initialState) => {
  return state;
};

const selectFaves = state => state.faves;

const selectIsLoading = createSelector(
  selectFaves,
  favesState => favesState.isLoading,
);

const selectIsLoaded = createSelector(
  selectFaves,
  favesState => favesState.isLoaded,
);

const selectFavesList = createSelector(
  selectFaves,
  favesState => favesState.list,
);

export {
  selectIsLoading,
  selectIsLoaded,
  selectFavesList,
};