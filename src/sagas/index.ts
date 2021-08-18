import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from '../actions'
import { Post } from '../models/Post'
import { INVALIDATE_REDDIT, SELECT_REDDIT } from '../actions/constants'
import { selectedRedditSelector, postsByRedditSelector } from '../reducers/selectors'

export function fetchPostsApi(reddit: number) {
    return fetch(`https://eztv.re/api/get-torrents?limit=100&page=1`)
        .then(response => response.json())
        .then(json => json.torrents.map((item: Post) => item))
}

export function* fetchPosts(reddit: number) {
    yield put(actions.requestPosts(reddit))
    const posts: Array<Post> = yield call(fetchPostsApi, reddit);
    const children: Array<[string, string]> = [["65", "A"], ["97", "B"]];
    yield put(actions.receivePosts(reddit, posts, 2))
}

export function* invalidateReddit() {
    while (true) {
        const { reddit } = yield take(INVALIDATE_REDDIT)
        yield call(fetchPosts, reddit)
    }
}

export function* nextRedditChange() {
    while (true) {
        const prevReddit: number = yield select(selectedRedditSelector)
        yield take(SELECT_REDDIT)

        const newReddit: number = yield select(selectedRedditSelector)
        const postsByReddit: object = yield select(postsByRedditSelector)
        if (prevReddit !== newReddit) yield fork(fetchPosts, newReddit)
    }
}

export function* startup() {
    const selectedReddit: number = yield select(selectedRedditSelector)
    yield fork(fetchPosts, selectedReddit)
}

export default function* root() {
    yield fork(startup)
    yield fork(nextRedditChange)
    yield fork(invalidateReddit)
}
