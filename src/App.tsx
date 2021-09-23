import logo from './logo.svg';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeFilled, HomeTwoTone } from '@ant-design/icons';
import './App.css';
import './bulma.css';
import 'antd/dist/antd.css'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Help from './pages/Help'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Sudoku from './pages/Sudoku'
import Hooks from './pages/ahooks'
import CSS3 from './pages/CSS3'
import React from 'react';
import mergeSort from './utils/array-sort'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App() {
    const [time, setTime] = React.useState(new Date());
    const [numbers, setNumbers] = React.useState([11, 2, 6, 7, 8, 3, 4, 66, 23, 96, 47]);
    const nums = mergeSort(numbers, (x, y) => x > y);
   
    console.log(time);
    return (
        <Layout>
            <Router>
                <Header className="header">
                    <div className="logo"> </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<HomeTwoTone />}><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/Docs">Docs</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/Help">Help</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/ahooks">ahooks</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="/Contact">Contact</Link></Menu.Item>
                        <Menu.Item key="6"><Link to="/Dashboard">Dashboard</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/CSS3">CSS3</Link></Menu.Item>
                        <Menu.Item key="8"><Link to="/Sudoku">Sudoku</Link></Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={180} className="site-layout-background">
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
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <img src={logo} className="App-logo" alt="logo" />
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <time>{time.toLocaleString()}</time>
                            <Layout>
                                <Switch>
                                    <Route exact path="/">
                                        <Home />
                                    </Route>
                                    <Route path="/docs">
                                        <Docs />
                                    </Route>
                                    <Route path="/help">
                                        <Help />
                                    </Route>
                                    <Route path="/ahooks">
                                        <Hooks />
                                    </Route>
                                    <Route path="/Contact">
                                        <Contact />
                                    </Route>
                                    <Route path="/Dashboard">
                                        <Dashboard />
                                    </Route>
                                    <Route path="/CSS3">
                                        <CSS3 />
                                    </Route>
                                    <Route path="/Sudoku">
                                        <Sudoku />
                                    </Route>
                                </Switch>
                            </Layout>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </Layout>
    );
}
export default App;
