import { Button, Tag, Space, Card, Modal } from 'antd'
import { useSize, useTitle } from 'ahooks'
import { of } from 'rxjs'
import React from 'react';
import IM from '../components/Push/Index'
const Help = () => {
    const size = useSize(() => window.document.body);
    let title = `width:${size.width} height:${size.height}`
    let [visible, setVisible] = React.useState(false);
    let [value, setValue] = React.useState<number>(2);
    useTitle(title);
    return (<Card >
        <Card>
            <Space >
                <Tag className="learn">{title}</Tag>
            </Space>
            <a
                className="App-link"
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                React
          </a>
            <span>, </span>
            <a
                className="App-link"
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Redux
                
            </a>
            <span>, </span>
            <a
                className="App-link"
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Redux Toolkit
          </a>
            <a
                className="App-link"
                href="https://react-redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                React Redux
          </a>
            <Modal visible={visible} closable={true} onCancel={(e) => { setVisible(false); }} onOk={() => { setVisible(false); }}>
                <Tag>{value}</Tag>
            </Modal>
            <Button type='primary' onClick={() => {
                let x = of<number>(value);
                x.pipe().subscribe(t => {
                    let v = Math.pow(t, 2);
                    setValue(v);
                    setVisible(true);
                });
            }}>hello rxjs</Button>
        </Card>
        <Card>
            <Button type='primary' onClick={() => {
                setVisible(true);
            }}>Help</Button>
            <IM></IM>
        </Card>
    </Card>);
}
export default Help;