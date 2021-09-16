import { Tabs } from 'antd'
import Grid from '../components/CSS3/Grid'
import Flex from '../components/CSS3/Flex'
const { TabPane } = Tabs;

const CSS3 = () => {
    return (<Tabs >
        <TabPane tab="Flex" key="flex" >
            <Grid />
        </TabPane>
        <TabPane tab="Grid" key='grid'>
            <Flex />
        </TabPane>
    </Tabs>);
}
export default CSS3;