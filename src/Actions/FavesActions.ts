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

const VK_LOAD_FAVES_COUNT = 100;

export const importFaves = () => (dispatch, getState): Promise<void> => {
  const token = selectToken(getState());
  console.log('import...');
  
  if (!token) {
    throw 'Trying load faves without token';
  }
  return FavesApi.clearSavedFaves()
    .then(() => {
      dispatch(importingFaves());
      return loadAndSave(token);
    })
    .then(() => {
      dispatch(importingFavesSucceeded());
    })
    .catch(error => {
      console.log('some importing error', error);
      return dispatch(importingFavesFailed());
    });
};

const loadAndSave = (token: string, offset: number = 0) => {
  return new Promise<void>((resolve: () => void, reject: () => void) => {
    FavesApi.loadFavesFromVk({
      token,
      offset,
      count: VK_LOAD_FAVES_COUNT,
    }).then(result => {
      const faves = result.response.items;
      console.log('vk faves', faves);
      FavesApi.saveManyFavesToBd(faves)
        .then(() => {
          console.log('---- saved');
          
          // count field in vk is larger than real number of existing posts yet,
          // faves.length in response is almost ever lower than number was requested
          offset += VK_LOAD_FAVES_COUNT;
          const allItemsNumber = result.response.count;

          if (offset < allItemsNumber) {
            loadAndSave(token, offset)
              .then(resolve)
              .catch(reject);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  });
};

export const loadFaves = () => (dispatch, getState) => {
  dispatch(loadingFaves());
  const token = selectToken(getState());
  if (!token) {
    throw 'Trying load faves without token';
  }
  return FavesApi.fetchSavedFaves()
    .then(faves => {
      console.log('faves', faves);
      return dispatch(loadingFavesSucceeded(faves));
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
