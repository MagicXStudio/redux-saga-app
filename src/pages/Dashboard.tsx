import { Avatar, Drawer, Card, message, Button, Tag, Space, Tooltip, Divider, Image, List, BackTop } from "antd"
import { useRequest } from 'ahooks';
import { Contact } from "../models/Contact";
const Dashboard = () => {
    const { data, error, loading } = useRequest('http://106.13.130.51:4327/api/app/contact?SkipCount=0&MaxResultCount=14');
    return (<div className='container'>
        <div className="columns">
            <div className="column is-half">
                <div>
                    {data?.items?.map((item) => (
                        <Card className="card" key={item.id} onClick={(e) => {
                            alert(e);
                        }}>
                            <figure className="image">
                                <Image src={item.avatarUrl} width={200} />
                            </figure>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                            <Avatar src={item.avatarUrl} size="large" />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <Tag className="title is-4">{item.name}</Tag>
                                        <p className="subtitle is-6">@{item.title}</p>
                                        <input className="input is-small" type="text" placeholder="Text input" />
                                        <Button type="primary" onClick={(e) => {
                                            alert(e.target);
                                        }}>确定</Button>
                                    </div>
                                </div>
                                <div className="content">
                                    {item.motto} <a>@{item.age}</a>.
                        <a href="#">#css</a>
                                    <a href="#">#responsive</a>
                                    <Divider />
                                    <time >{item.phone}</time>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="column is-two-fifths">
                <List
                    itemLayout="horizontal"
                    dataSource={data?.items}
                    renderItem={(item: Contact) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatarUrl} />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={item.motto}
                            />
                        </List.Item>
                    )}
                />,
             </div>
            <div className="column">
                <Image
                    width={300}
                    src="https://www.lintsense.cn/hello/images/133.png"
                />
            </div>
        </div>
        <BackTop />
    </div>);
}
export default Dashboard;