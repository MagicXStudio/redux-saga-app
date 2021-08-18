import * as React from 'react'
import { Post } from '../models/Post'
import {Tag} from 'antd'
type Props = {
    posts: Array<Post>
}
type State = {
    count: number,
    time: Date
}
export default class Posts extends React.Component<Props, State> {
    readonly state: State = {
        count: 0,
        time: new Date()
    };
    render() {
        return (
            <div>
                <Tag>{this.state.time.toLocaleDateString()}</Tag>
                <ul>
                    {this.props.posts.map((post: Post, index: number) => <li key={index} onClick={() => { alert(this) }} ><span>{post.title} </span></li>)}
                </ul>
            </div>
        )
    }
}

