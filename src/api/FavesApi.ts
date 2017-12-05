import * as Url from 'url';
import { VK_API_VERSION } from '../Constants';
import { getRealm } from '../Backend/Realm';
import { FavePostProps, PhotoProps, GroupProps, ProfileProps } from '../Backend/Models';

// export const saveFaveToBd = (fave: Fave) => {
// getRealm()
// .then(realm => {
//   realm.write(() => {

//   });
// })
// };

export const saveManyFavesToBd = ({ items, groups, profiles }: FavesResponseData) => {
  return getRealm().then(realm => {
    return realm.write(() => {
      const savedGroups = groups.map(groupData => realm.create<GroupProps>('Group', {
          id: groupData.id,
          name: groupData.name,
          urlName: groupData.screen_name,
          photo_50: groupData.photo_50 || null,
          photo_100: groupData.photo_100 || null,
          photo_200: groupData.photo_200 || null,
        }, true));

      const savedProfiles = profiles.map(profileData => realm.create<ProfileProps>('Profile', {
        id: profileData.id,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        urlName: profileData.screen_name,
        photo_50: profileData.photo_50 || null,
        photo_100: profileData.photo_100 || null,
      }, true));

      items.map(faveData => {
        const authorId = Math.abs(faveData.from_id); // Because sometimes it is negative for unknown reason
        const ownerId = Math.abs(faveData.owner_id); // Because sometimes it is negative for unknown reason
        const fave = realm.create<FavePostProps>('FavePost', {
          id: faveData.id,
          text: faveData.text,
          date: faveData.date,
          photos: [],
          authorId,
          ownerId,
        }, true);

        const attachments = faveData.attachments || [];
        attachments.reduce((photos, { photo }) => {
          if (photo) {
            photos.push(
              realm.create<PhotoProps>('Photo', {
                id: photo.id,
                text: photo.text,
                height: photo.height,
                width: photo.width,
                photo_75: photo.photo_75,
                photo_130: photo.photo_130,
                photo_604: photo.photo_604,
                photo_807: photo.photo_807,
                post: fave,
              }, true)
            );
          }
          return photos;
        }, fave.photos);

        const authorGroup = savedGroups.find(group => group.id === authorId);
        if (authorGroup) {
          fave.authorGroup = authorGroup;
          // const posts = authorGroup.posts || [];
          // authorGroup.posts = [...posts, fave];
        } else {
          const authorProfile = savedProfiles.find(profile => profile.id === authorId);
          fave.authorProfile = authorProfile;
          // const posts = authorProfile.posts || [];
          // authorProfile.posts = [...posts, fave];
        }
      });
    });
  });
};

export const fetchSavedFaves = () => {
  return getRealm().then(realm => {
    return realm.objects<FavePostProps>('FavePost');
  });
};

export const clearSavedFaves = () => {
  return getRealm().then(realm => {
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

export const loadFavesFromVk = ({
  token,
  offset = 0,
  count = 100,
}: LoadFavesParams): Promise<FavesResponse> => {
  const query = {
    access_token: token,
    v: VK_API_VERSION,
    extended: 1,
    offset,
    count,
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
  response: FavesResponseData;
}

export interface FavesResponseData {
  count: number;
  items: Fave[];
  groups: Group[];
  profiles: Profile[];
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

export interface Group {
  id: number;
  is_closed: 0 | 1 | 2;
  name: string;
  photo_50: string;
  photo_100: string;
  photo_200: string;
  screen_name: string;
  type: 'group' | 'page' | 'event';
}

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  online?: 0 | 1;
  photo_50?: string;
  photo_100?: string;
  screen_name?: string;
  sex?: 0 | 1 | 2;
}