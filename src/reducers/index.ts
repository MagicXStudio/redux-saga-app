import { combineReducers } from 'redux'
import { SELECT_REDDIT, REQUEST_POSTS, RECEIVE_POSTS, GET_ITEMS } from '../actions/constants'
import * as PostActions from '../actions/index'
import { ActionType } from 'typesafe-actions';
import { Post } from '../models/Post'

export type PostAction = ActionType<typeof PostActions> & { reddit: string };

export interface NewsObject {
    isFetching: false,
    lastUpdated: number,
    items: Array<Post>
};

export interface NewsState {
    postsByReddit: NewsObject;
    selectedReddit: number;
}

const initialState: NewsState = {
    selectedReddit: 0,
    postsByReddit: { isFetching: false, lastUpdated: 0, items: [] }
};


function selectedReddit(state = 'reactjs', action: PostAction) {
    console.log(state);
    switch (action.type) {
        case SELECT_REDDIT:
            return action.payload
        default:
            return state
    }
}

function getItems(state = 'hooks', action: PostAction) {
    console.log(state);
    switch (action.type) {
        case GET_ITEMS:
            return action.payload
        default:
            return state
    }
}


function posts(state = initialState, action: PostAction) {
    console.log(action);
    switch (action.type) {
        case REQUEST_POSTS:
            return { ...state, isFetching: true }

        case RECEIVE_POSTS:
            let item = {
                isFetching: false,
                items: action.meta,
                lastUpdated: action,
            }
            return item;
        default:
            return initialState
    }
}

function postsByReddit(state = initialState, action: PostAction) {
    switch (action.type) {
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            let data = posts(state, action);
            return data;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    selectedReddit,
    postsByReddit,
    posts,
    getItems
})

export default rootReducer
