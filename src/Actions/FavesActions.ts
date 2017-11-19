import {
  loadingFaves,
  loadingFavesFailed,
  loadingFavesSucceeded,
  importingFaves,
  importingFavesFailed,
  importingFavesSucceeded,
} from './ActionCreators';
import { selectToken } from '../Reducers/UserReducer';
import * as FavesApi from '../api/FavesApi';

// export const importFaves = () => (dispatch, getState): Promise<void> => {
//   const token = selectToken(getState());
//   if (!token) {
//     throw 'Trying load faves without token';
//   }
//   dispatch(importingFaves());

// };

// const loadAndSave = (token: string, importedFavesNumber: number = 0, allItemsNumber: number = null) => {
//   return new Promise((resolve: () => void, reject: () => void) => {
//     FavesApi.loadFaves(token)
//       .then(result => {
//         allItemsNumber = result.response.count;
//         const faves = result.response.items;
//         const savingToBdPromises = faves.map(fave => FavesApi.saveFaveToBd(fave));
//         Promise.all(savingToBdPromises);
//         return dispatch(loadingFavesSucceeded(response.response.items));
//       })
//       .catch(() => dispatch(loadingFavesFailed()));
//   });
// }

export const loadFaves = () => (dispatch, getState): Promise<FavesApi.Fave[]> => {
  dispatch(loadingFaves());
  const token = selectToken(getState());
  if (!token) {
    throw 'Trying load faves without token';
  }
  return FavesApi.loadFaves(token)
    .then(response => {
      console.log('response', response);
      return dispatch(loadingFavesSucceeded(response.response.items));
    })
    .catch(() => dispatch(loadingFavesFailed()));
};
