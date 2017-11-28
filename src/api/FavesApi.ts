import * as Url from 'url';
import { VK_API_VERSION } from '../Constants';
import { getRealm } from '../Backend/Realm';
import { FavePostProps, PhotoProps } from '../Backend/Models';

// export const saveFaveToBd = (fave: Fave) => {
  // getRealm()
  // .then(realm => {
  //   realm.write(() => {

  //   });
  // })
// };

export const saveManyFavesToBd = (faves: Fave[]) => {
  return getRealm()
  .then(realm => {
    return realm.write(() => {
      faves.map(faveData => {
        const fave = realm.create('FavePost', {
          vkId: faveData.id,
          fromVkId: faveData.from_id,
          text: faveData.text,
          ownerVkId: faveData.owner_id,
          date: faveData.date,
          photos: [],
        });

        const attachments = faveData.attachments || [];
        attachments.reduce((photos, { photo }) => {
          if (photo) {
            photos.push(realm.create('Photo', {
              vkId: photo.id,
              text: photo.text,
              height: photo.height,
              width: photo.width,
              photo_75: photo.photo_75,
              photo_130: photo.photo_130,
              photo_604: photo.photo_604,
              photo_807: photo.photo_807,
              post: fave,
            }));
          }
          return photos;
        }, fave.photos);
      });
    });
  });
};

export const fetchSavedFaves = () => {
  return getRealm()
  .then(realm => {
    return realm.objects<FavePostProps>('FavePost');
  });
};

export const clearSavedFaves = () => {
  return getRealm()
  .then(realm => {
    return realm.write(() => {
      const allFavePosts = realm.objects<FavePostProps>('FavePost');
      const allPhotos = realm.objects<PhotoProps>('Photo');
      console.log('before delete', allFavePosts.length, allPhotos.length);
      const deletingEntities = [];
      if (allFavePosts.length) {
        deletingEntities.push(allFavePosts);
      }
      if (allPhotos.length) {
        deletingEntities.push(allPhotos);
      }
      realm.delete(deletingEntities);
    });
  });
};

interface LoadFavesParams {
  token: string;
  offset?: number;
  count?: number;
}

export const loadFavesFromVk = ({ token, offset = 0, count = 100 }: LoadFavesParams): Promise<FavesResponse> => {
  const query = {
    access_token: token,
    v: VK_API_VERSION,
    // extended: 1,
    offset,
    count
  };

  const url = Url.format({
    protocol: 'https',
    host: 'api.vk.com',
    pathname: '/method/fave.getPosts',
    query,
  });
  return fetch(url)
    .then(response => response.json())
    .then((res: FavesResponse) => {
      return res;
    })
    .catch(error => {
      throw error;
    });
};
export interface FavesResponse {
  type: string;
  response: {
    count: number;
    items: Fave[];
  };
}

export interface Fave {
  attachments: Attachment[];
  comments: Comment;
  date: number;
  from_id: number;
  id: number;
  likes: { count: number; user_likes: number; can_like: number; can_publish: number };
  marked_as_ads: number;
  owner_id: number;
  post_source: { type: string };
  post_type: string;
  reposts: {
    count: number;
    user_reposted: number;
  };
  text: string;
  views: {
    count: number;
  };
}

export interface Comment {
  count: number;
  groups_can_post: boolean;
  can_post: number;
}

export enum AttachmentTypes {
  photo = 'photo',
}

export interface Attachment {
  type: AttachmentTypes;
  photo?: Photo;
}

export interface Photo {
  access_key: string;
  album_id: number;
  date: number;
  height: number;
  id: number;
  owner_id: number;
  photo_75: string;
  photo_130: string;
  photo_604: string;
  photo_807?: string;
  post_id: number;
  text: string;
  user_id: number;
  width: number;
}
