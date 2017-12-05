import { ObjectSchema } from 'realm';

export class Photo {
  public static schema: ObjectSchema = {
    name: 'Photo',
    primaryKey: 'id',
    properties: {
      id: 'int',
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
    primaryKey: 'id',
    properties: {
      id: 'int',
      authorId: 'int',
      text: 'string',
      date: 'int',
      ownerId: 'int?',
      photos: 'Photo[]',
      authorGroup: 'Group',
      authorProfile: 'Profile',
    },
  };
}

export class Group {
  public static schema: ObjectSchema = {
    name: 'Group',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      photo_50: 'string?',
      photo_100: 'string?',
      photo_200: 'string?',
      urlName: 'string',
      posts: { type: 'linkingObjects', objectType: 'FavePost', property: 'authorGroup' },
    }
  };
}

export class Profile {
  private firstName: string;
  private lastName: string;

  public static schema: ObjectSchema = {
    name: 'Profile',
    primaryKey: 'id',
    properties: {
      id: 'int',
      firstName: 'string',
      lastName: 'string',
      urlName: 'string?',
      photo_50: 'string?',
      photo_100: 'string?',
      posts: { type: 'linkingObjects', objectType: 'FavePost', property: 'authorProfile' },
    }
  };

  public get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export interface PhotoProps {
  id: number;
  text: string;
  height: number;
  width: number;
  photo_75?: string;
  photo_130?: string;
  photo_604?: string;
  photo_807?: string;
  post?: FavePostProps;
}

export interface FavePostProps {
  id: number;
  authorId: number;
  text: string;
  ownerId: number;
  date: number;
  photos?: PhotoProps[];
  authorGroup?: GroupProps;
  authorProfile?: ProfileProps;
}

export interface GroupProps {
  id: number;
  name: string;
  photo_50?: string;
  photo_100?: string;
  photo_200?: string;
  urlName: string;
  posts?: FavePostProps[];
  // isClosed: 0 | 1 | 2;
  // type: 'group' | 'page' | 'event';
}

export interface ProfileProps {
  id: number;
  firstName: string;
  lastName: string;
  name?: string;
  urlName?: string;
  photo_50?: string;
  photo_100?: string;
  posts?: FavePostProps[];
  // online?: 0 | 1;
  // sex?: 0 | 1 | 2;
}