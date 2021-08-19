import * as React from 'react'
import { Post } from '../models/Post'
import { Tag, Table, Space, Button } from 'antd'
type Props = {
    posts: Array<Post>
}
type State = {
    count: number,
    time: Date
}
const columns = [
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'size_bytes',
        dataIndex: 'size_bytes',
        key: 'size_bytes',
        render: (size: number) => (<Tag>{size / 1024 / 1024 / 1024} GB </Tag>)
    },
    {
        title: 'imdb_id',
        dataIndex: 'imdb_id',
        key: 'imdb_id',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: string, record: Post) => (
            <Space size="middle">
                <Button onClick={() => { alert(this); }}>Details</Button>
                <Button onClick={() => { alert(record.title) }}>Delete</Button>
            </Space>
        ),
    },
];
export default class Posts extends React.Component<Props, State> {
    readonly state: State = {
        count: 0,
        time: new Date()
    };
    render() {
        return (
            <div>
                <Table dataSource={this.props.posts} columns={columns} />;
            </div>
        )
    }
}

