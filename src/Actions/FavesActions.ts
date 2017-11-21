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

export const importFaves = () => (dispatch, getState): Promise<void> => {
  const token = selectToken(getState());
  if (!token) {
    throw 'Trying load faves without token';
  }
  return FavesApi.clearSavedFaves()
    .then(() => {
      dispatch(importingFaves());
      return loadAndSave(token);
    })
    .then(() => dispatch(importingFavesSucceeded()))
    .catch(error => {
      console.log('some importing error', error);
      return dispatch(importingFavesFailed());
    });
};

const loadAndSave = (token: string, importedFavesNumber: number = 0) => {
  return new Promise<void>((resolve: () => void, reject: () => void) => {
    setTimeout(() => {
      FavesApi.loadFaves({ token, offset: importedFavesNumber }).then(result => {
        console.log('loaded', result);

        const allItemsNumber = result.response.count;
        const faves = result.response.items;
        const savingToBdPromises = faves.map(fave => FavesApi.saveFaveToBd(fave));
        return Promise.all(savingToBdPromises).then(() => {
          importedFavesNumber += faves.length;
          console.log('imported', importedFavesNumber);
          if (importedFavesNumber < allItemsNumber) {
            loadAndSave(token, importedFavesNumber)
              .then(resolve)
              .catch(reject);
          } else {
            resolve();
          }
        });
      });
    }, 1500);
  });
};

export const loadFaves = () => (dispatch, getState): Promise<FavesApi.Fave[]> => {
  dispatch(loadingFaves());
  const token = selectToken(getState());
  if (!token) {
    throw 'Trying load faves without token';
  }
  return FavesApi.fetchSavedFaves()
    .then(response => {
      console.log('response', response);
      return dispatch(loadingFavesSucceeded(response.response.items));
    })
    .catch(() => dispatch(loadingFavesFailed()));
};
// export const loadFaves = () => (dispatch, getState): Promise<FavesApi.Fave[]> => {
//   dispatch(loadingFaves());
//   const token = selectToken(getState());
//   if (!token) {
//     throw 'Trying load faves without token';
//   }
//   return FavesApi.loadFaves(token)
//     .then(response => {
//       console.log('response', response);
//       return dispatch(loadingFavesSucceeded(response.response.items));
//     })
//     .catch(() => dispatch(loadingFavesFailed()));
// };
