import * as React from 'react'
import { connect } from 'react-redux'
import { selectReddit, invalidateReddit } from '../actions'
import Picker from './Picker'
import Posts from './Posts'
import { Post } from '../models/Post'
import { NewsState } from '../reducers/index'
import { Button, Space } from 'antd'
export type Props = {
    selectedReddit: number,
    isFetching: boolean,
    posts: Array<Post>,
    lastUpdated: number,
    dispatch: Function,
}

class News extends React.Component<Props, NewsState> {
    constructor(props: Props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    handleChange(nextReddit: number) {
        let action = selectReddit(nextReddit);
        this.props.dispatch(action)
    }

    handleRefreshClick() {
        //e.preventDefault()
        const { dispatch, selectedReddit } = this.props;
        let action = invalidateReddit(selectedReddit);
        dispatch(action)
    }

    render() {
        const { selectedReddit, posts, isFetching, lastUpdated } = this.props
        return (
            <div>
                <Picker value={selectedReddit} onChange={this.handleChange} options={['react', 'redux']} />
                <Space>
                    {<span>Last updated at {new Date().toLocaleTimeString()}.</span>}
                    {
                        !isFetching && (
                            <Button type='primary' onClick={this.handleRefreshClick} >
                                Refresh
                            </Button>
                        )
                    }
                </Space>
                {
                    isFetching && <h2>正在加载...</h2>}
                {
                    posts?.length === 0 && <h2>暂无数据.</h2>}
                {
                    posts?.length > 0 && (
                        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <Posts posts={posts} />
                        </div>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state: NewsState) {
    const { selectedReddit, postsByReddit } = state;
    let item = postsByReddit || { items: [] };
    let result = {
        selectedReddit,
        posts: item.items,
        isFetching: false,
        lastUpdated: 0
    }
    return result;
}
export default connect(mapStateToProps)(News)
