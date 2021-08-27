import { Post } from '../models/Post'
import { action } from 'typesafe-actions'
import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SELECT_REDDIT,
    INVALIDATE_REDDIT,
    GET_ITEMS
} from './constants';


export const selectReddit = (reddit: number) => action(SELECT_REDDIT, reddit);

export const getItems = (type: string, items: string[]) => action(GET_ITEMS, type, items);

export const invalidateReddit = (reddit: number) => action(INVALIDATE_REDDIT, reddit);

export const requestPosts = (reddit: number) => action(REQUEST_POSTS, reddit);

export const receivePosts = (reddit: number, posts: Array<Post>, receivedAt: number) => action(RECEIVE_POSTS, reddit, posts, receivedAt = new Date().setMilliseconds(0));
