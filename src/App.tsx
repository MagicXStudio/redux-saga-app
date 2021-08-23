import logo from './logo.svg';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeFilled, HomeTwoTone } from '@ant-design/icons';
import News from './components/News'
import Clock from './components/Clock/index'
import './App.css';
import { useSetInterval } from './hooks';
import { of } from 'rxjs'
import { Button, Tag, Space } from 'antd'
import 'antd/dist/antd.css'
import React from 'react';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App() {
    const [value, onChange] = React.useState(new Date());
    useSetInterval(() => {
        const now = new Date();
        onChange(now);
    }, 1000);
    return (
        <Layout>
            <Header className="header">
                <div className="logo"> </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeTwoTone />}>Home</Menu.Item>
                    <Menu.Item key="2">Docs</Menu.Item>
                    <Menu.Item key="3">Help</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="react">
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="redux">
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined />} title="rxjs">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<HomeFilled />} title="typescript">
                            <Menu.Item key="13">option9</Menu.Item>
                            <Menu.Item key="14">option10</Menu.Item>
                            <Menu.Item key="15">option11</Menu.Item>
                            <Menu.Item key="16">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Layout>
                            <Clock
                                size={100}
                                renderNumbers={true}
                                renderMinuteHand={true}
                                renderSecondHand={true}
                                value={value}
                            />
                            <b>{value.toLocaleString()}</b>
                            <Space>
                                <Space >
                                    <span className="learn">Learn </span>
                                    <img src={logo} className="App-logo" alt="logo" />
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
                                <Button type='primary' onClick={() => {
                                    let x = of(123);
                                    console.log(x);
                                }}>hello rxjs</Button>
                            </Space>
                            <News />
                        </Layout>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
export default App;
