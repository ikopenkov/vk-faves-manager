import { StorageInstance } from '../../Reducers/StorageReducer';
import { Fave } from '../FavesApi';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const STORAGE = new Storage({
  // maximum capacity, default 1000
  size: 50000,

  // Use AsyncStorage for RN, or window.localStorage for web.
  // If not set, data would be lost after reload.
  storageBackend: AsyncStorage,

  // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired,
  // the corresponding sync method will be invoked and return
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

const FAVE_KEY = 'fave';

export interface FaveBDEntityParams {
  id: string | number;
  vkData: Fave;
}

// interface FetchParams {
//   count?: number;
//   offset?: number;
// }
export default class RNFavesStorage {
  private storage: StorageInstance;

  constructor() {
    this.storage = STORAGE;
  }

  // public async fetch({ count, offset }: FetchParams) {
  public async fetch() {
    const allFaves = await this.storage.getAllDataForKey(FAVE_KEY);
    console.log('allFaves', allFaves);
    
    return allFaves;
  }

  public async create(fave: Fave) {
    const id = await this.getIdForNew();
    return await this.storage.save({
      key: FAVE_KEY,
      id,
      expires: null,
      data: {
        xz: 'asdfsd',
        vkData: fave,
      },
    })
    .then(() => console.log('saved fave to bd'))
    .catch(error => console.log('some async storage fave saving error', error));
  }

  public async clearAll() {
    this.storage.clearMapForKey(FAVE_KEY);
  }

  private async getIdForNew() {
    const ids = (await this.storage.getIdsForKey(FAVE_KEY)) || [];
    const lastId = ids[ids.length - 1];
    return (lastId + 1).toString()  || '1';
  }
}
