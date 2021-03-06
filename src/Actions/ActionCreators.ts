import { createAction } from 'redux-actions';

export const loadingFaves = createAction('loadingFaves');
export const loadingFavesSucceeded: (response: any) => void = createAction('loadingFavesSucceeded');
export const loadingFavesFailed = createAction('loadingFavesFailed');

export const importingFaves = createAction('importingFaves');
export const importingFavesSucceeded = createAction('importingFavesSucceeded');
export const importingFavesFailed = createAction('importingFavesFailed');

export const setTokenAction: (token: string) => void = createAction('setToken');
export const unsetTokenAction: () => void = createAction('unsetToken');