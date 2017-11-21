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
  id: number;
  vkData: Fave;
}

// interface FetchParams {
//   count?: number;
//   offset?: number;
// }
export default class RNFavesStorage {
  private storage: StorageInstance;
  private lastId: number;

  constructor() {
    this.storage = STORAGE;

    this.getLastId().then(lastId => this.lastId = lastId);
  }

  // public async fetch({ count, offset }: FetchParams) {
  public async fetch(): Promise<FaveBDEntityParams[]> {
    return await this.storage.getAllDataForKey(FAVE_KEY);
  }

  public async getById(id: number): Promise<Fave> {
    return await this.storage.load({
      key: FAVE_KEY,
      id,
    });
  }

  public async createMany(faves: Fave[]) {
    const promises = faves.map(fave => this.create(fave));
    return Promise.all(promises);
  }

  public async create(fave: Fave) {
    const id = ++this.lastId;
    return await this.storage.save({
      key: FAVE_KEY,
      id,
      expires: null,
      data: {
        vkData: fave,
        id,
      },
    });
  }

  public async clearAll() {
    this.storage.clearMapForKey(FAVE_KEY);
  }

  private async getLastId() {
    const ids = (await this.storage.getIdsForKey(FAVE_KEY)) || [];
    return ids.length ? ids[ids.length - 1] : -1;
  }
}
