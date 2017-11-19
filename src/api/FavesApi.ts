import * as Url from 'url';
import { VK_API_VERSION } from '../Constants';
import FaveStorage from './DataStorage/RNFavesStorage';

const faveStorage = new FaveStorage();

export const saveFaveToBd = (fave: Fave) => {
  return faveStorage.create(fave);
};

export const fetchSavedFaves = () => {
  return faveStorage.fetch();
};

export const clearSavedFaves = () => {
  return faveStorage.clearAll();
};

export const loadFaves = (token: string): Promise<FavesResponse> => {
  const query = {
    access_token: token,
    v: VK_API_VERSION,
    extended: 1,
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
