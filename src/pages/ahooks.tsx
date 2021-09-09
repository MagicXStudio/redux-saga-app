import { Card, Tabs, Button, notification } from 'antd'
import { useState } from "react";
import WebSocket from '../components/ahooks/WebSocket'
import * as settings from "../data/settings.json";
const { TabPane } = Tabs;
const Hooks = () => {
    const [item, setItem] = useState<string>(settings.hooks[0]);
    const tabOnChange = (tab) => {
        let item = settings.hooks[tab];
        setItem(item);
    };
    const openNotification = () => {
        notification.open({
            message: item,
            description:
                item,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
    return (
        <Tabs defaultActiveKey="1" tabPosition="left" onChange={tabOnChange}>
            {settings.hooks.map((hook, index) => (
                <TabPane tab={hook} key={index}>
                    <Card key={index}>
                        <Button type="primary" onClick={openNotification}>
                            {hook}
                        </Button>
                        <WebSocket />
                    </Card>
                </TabPane>
            ))}
        </Tabs>);
}
export default Hooks;