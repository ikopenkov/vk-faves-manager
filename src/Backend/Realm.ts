import Realm from 'realm';
import { FavePost, Photo } from './Models';

let realm: Realm;

export const getRealm = () => {
  return new Promise<Realm>((resolve, reject) => {
    if (realm) {
      resolve(realm);
    } else {
      Realm.open({
        schema: [Photo, FavePost],
        inMemory: true,
      })
        .then(realmInstance => {
          realm = realmInstance;
          resolve(realm);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};
