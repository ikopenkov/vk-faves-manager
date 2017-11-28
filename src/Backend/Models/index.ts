import { ObjectSchema } from 'realm';

export class Photo {
  public static schema: ObjectSchema = {
    name: 'Photo',
    // primaryKey: 'id',
    properties: {
      // id: 'int',
      vkId: 'int',
      text: 'string?',
      height: 'int',
      width: 'int',
      photo_75: 'string',
      photo_130: 'string',
      photo_604: 'string',
      photo_807: 'string?',
      post: { type: 'linkingObjects', objectType: 'FavePost', property: 'photos' },
    },
  };
}

export class FavePost {
  public static schema: ObjectSchema = {
    name: 'FavePost',
    // primaryKey: 'id',
    properties: {
      // id: 'int',
      vkId: 'int',
      fromVkId: 'int',
      text: 'string',
      date: 'int',
      ownerVkId: 'int?',
      photos: 'Photo[]',
    },
  };
}

export interface PhotoProps {
  id: number;
  vkId: number;
  text: string;
  height: number;
  width: number;
  photo_75: string;
  photo_130: string;
  photo_604: string;
  photo_807: string;
  post: FavePostProps;
}

export interface FavePostProps {
  id: number;
  vkId: number;
  fromVkId: number;
  text: string;
  ownerVkId: number;
  date: number;
  photos: PhotoProps[];
}
