import { Avatar, Table, Drawer, Card, message, Button, Tag, Space, Tooltip, Alert, Modal, notification } from "antd"
import { ajax } from 'rxjs/ajax';
import { SmileOutlined } from '@ant-design/icons';
import { map } from 'rxjs/operators';
import ContactForm from './Form'
import React, { useRef, useState } from 'react'
import { useRequest } from 'ahooks'
import { Contact } from "../../models/Contact";
import { PagedResult } from "../../models/PagedResult";

function getContacts(name: string): Promise<{ success: boolean, result: PagedResult<Contact> }> {
    return new Promise((resolve) => {
        const contactObservable = ajax({
            url: 'http://106.13.130.51:4327/api/app/contact?SkipCount=0&MaxResultCount=14&name=' + name,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'rxjs-header': 'rxjs'
            },
            body: {
                rxjs: 'hello rxjs!'
            }
        }).pipe(
            map(response => response.response),
        );
        contactObservable.subscribe(x => resolve({ success: true, result: x }))
    });
}

const Contacts = () => {
    const textRef = useRef<HTMLInputElement>(null);
    const [currentRow, setCurrentRow] = useState<Contact>();
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [state, setState] = useState('Lucy');
    const [pagedResult, setPagedResult] = useState<PagedResult<Contact>>();
    const { loading, run } = useRequest(getContacts, {
        manual: true,
        onSuccess: (result, params) => {
            if (result.success) {
                setPagedResult(result.result);
                message.success(`帮你查到满足条件："${params}" 的数据共有 ${result.result.totalCount}个 !`);
            }
        },
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>{text}
                    <Tooltip title={record.name} placement="top">
                        <Avatar style={{ backgroundColor: '#87d068' }} src={record.avatarUrl} />
                    </Tooltip>
                </div>
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <Tag>{text}</Tag>,
        },
        {
            title: 'Motto',
            dataIndex: 'motto',
            key: 'motto',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            render: avatarUrl => (
                <Avatar src={avatarUrl}></Avatar>)
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle" onClick={() => {
                    setCurrentRow(record);
                }}>
                    <a>Invite {record.name}</a>
                    <Button type="primary" onClick={(e) => {
                        e.preventDefault();
                        setVisible(true);
                    }}>编辑</Button>
                    <Button onClick={(e) => {
                        setModalVisible(true);

                    }}>删除</Button>
                </Space>
            ),
        },
    ];

    const openNotification = (msg: string) => {
        notification.open({
            message: '删除',
            description: msg,
            type: 'success',
            duration: 3,
            placement: "topRight",
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            onClick: () => {
                console.log(this);
            },
        });
    };

    return (
        <div>
            <input
                onCopy={(e) => false}
                ref={textRef}
                onPaste={(e) => false}
                onCut={(e) => false}
                onChange={(e) => setState(e.target.value)}
                value={state}
                placeholder="请输入名称"
                style={{ width: 240, marginRight: 16 }}
            />
            <Button type="primary" onClick={() => {
                textRef?.current?.focus();
                run(state)
            }}>搜索...</Button>
            <Table columns={columns} dataSource={pagedResult?.items} rowKey="id">
            </Table>
            <Drawer
                title={currentRow?.name}
                bodyStyle={{ paddingBottom: 80 }}
                visible={visible}
                width={450}
                onClose={() => { setVisible(false) }}>
                <Card>
                    <ContactForm
                        id={currentRow?.id}
                        name={currentRow?.name}
                        address={currentRow?.address}
                        age={currentRow?.age}
                        avatarUrl={currentRow?.avatarUrl}
                        motto={currentRow?.motto}
                        gender={currentRow?.gender}
                        roles={currentRow?.roles}
                        hobby={currentRow?.hobby}
                    ></ContactForm>
                </Card>
            </Drawer>
            <Modal title="删除?" cancelText="取消" okText="删除" okType="danger" afterClose={() => {
                console.info(this);
            }}
                visible={modalVisible}
                onOk={() => {
                    ajax.delete(`http://106.13.130.51:4327/api/app/contact/${currentRow!.id}`,
                        {
                            "time-now": `${+new Date()}`
                        })
                        .subscribe(x => {
                            let msg = x.status == 200 ? "删除成功！" : "删除失败！";
                            openNotification(msg);
                            setModalVisible(false);
                        });
                }}
                onCancel={() => { setModalVisible(false); }}>
                <p>{currentRow?.name}</p>
            </Modal>
            <div>{pagedResult?.totalCount}</div>
        </div>);
}
export default Contacts;