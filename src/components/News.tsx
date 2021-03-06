import * as React from 'react'
import { connect } from 'react-redux'
import { selectReddit, invalidateReddit, getItems } from '../actions'
import Picker from './Picker'
import Posts from './Posts'
import { Post } from '../models/Post'
import { NewsState } from '../reducers/index'
import { Button, Space, Card } from 'antd'
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
        this.handleItemsClick = this.handleItemsClick.bind(this);
    }

    handleChange(nextReddit: number) {
        let action = selectReddit(nextReddit);
        this.props.dispatch(action)
    }
    handleItemsClick() {
        let actiion = getItems('hooks', []);
        this.props.dispatch(actiion);
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
            <Card>
                <Picker value={selectedReddit} onChange={this.handleChange} options={['react', 'redux']} />
                <Space>
                    {<span>最近更新时间： {new Date().toLocaleTimeString()}.</span>}
                    {
                        !isFetching && (
                            <Button type='primary' onClick={this.handleRefreshClick} >
                                刷新
                            </Button>
                        )
                    }
                    <Button type='primary' onClick={this.handleItemsClick} >
                        Items
                    </Button>
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
            </Card>
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
