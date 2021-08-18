import { NewsState } from '../reducers/index'

export const selectedRedditSelector = (state: NewsState): number => state.selectedReddit
export const postsByRedditSelector = (state: NewsState) => state.postsByReddit
