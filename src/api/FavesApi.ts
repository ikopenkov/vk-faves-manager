import * as Url from 'url';
import { VK_API_VERSION } from '../Constants';

export const loadFaves = (token: string): FavesResponse => {
  const query = {
    access_token: token,
    v: VK_API_VERSION,
  };
  const url = Url.format({
    protocol: 'https',
    host: 'api.vk.com',
    pathname: '/method/fave.getPosts',
    query,
  });
  return fetch(url)
    .then(response => response.json())
    .then(res => {console.log('res', res); return res;})
    .catch(error => {
      throw error;
    });
};
export type FavesResponse = Promise<{
  type: string;
  response: {
    count: number;
    items: Fave[];
  }
}>;
export interface Fave {
  attachments: Object[];
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

interface Comment {
  count: number;
  groups_can_post: boolean;
  can_post: number;
}
