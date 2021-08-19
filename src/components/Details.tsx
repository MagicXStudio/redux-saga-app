import { Drawer, Card } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../models/Post'

type State = {
    visible: boolean
};

type Props = {
    item: Post
};
class Details extends React.Component<Props, State> {
    state = { visible: false };
    constructor(pros: Props) {
        super(pros);
        console.log(pros);
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return (<Drawer visible={this.state.visible}>
            <Card>
                <span>{this.props.item.title}</span>
            </Card>
        </Drawer>);
    };
}
const wrapWithConnect = connect();
export default wrapWithConnect(Details);