import * as React from 'react'
import { Post } from '../models/Post'
import { connect } from 'react-redux'
import { Tag, Table, Space, Button, Card } from 'antd'
import Details from './Details'
type Props = {
    posts: Array<Post>,
    dispatch: Function
}
type State = {
    count: number,
    time: Date
}
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
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
                <Button onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    console.log(e);
                }}>Details</Button>
                <Button onClick={() => { alert(record.title) }}>Delete</Button>
            </Space>
        ),
    },
];
class Posts extends React.Component<Props, State> {
    readonly state: State = {
        count: 0,
        time: new Date()
    };
    constructor(props: Props) {
        super(props);
        this.onShowDetails.bind(this);
    }
    onShowDetails() {
        this.props.dispatch({})
    }
    render() {
        return (
            <Card>
                <Table dataSource={this.props.posts} columns={columns} rowKey="id" />;
                <Details item={this.props.posts[0]} ></Details>
            </Card>
        )
    }
}
const wrapWithConnect = connect();
export default wrapWithConnect(Posts);

