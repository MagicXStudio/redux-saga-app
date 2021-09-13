import { Avatar, Upload, Form, Button, Image, Input, Radio, Row, Col } from "antd"
import { Contact } from "../../models/Contact";
import { ajax } from 'rxjs/ajax'
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const ContactForm = (item: Contact) => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    const onSummit = () => {
        console.log(form);
        ajax.put(`http://106.13.130.51:4327/api/app/contact/${item.id}`, item, {
            "Content-Type": "application/json"
        }).subscribe(http => {
                console.log(http);
            });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark='optional'
        >
            <Form.Item label="名称" required tooltip="必填项">
                <Row gutter={24}>
                    <Col span={4}>
                        <Form.Item
                            name="avatar"
                            label="图像"
                            rules={[{ required: true, message: '设置图像' }]}
                        >
                            <Avatar src={item.avatarUrl} />
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item
                            name="name"
                            label="姓名"
                            rules={[{ required: true, message: '请输入姓名' }]}
                        >
                            <Input placeholder="请输入姓名" value={item.name} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item label="性别" required tooltip="必须选择一个性别选项" name="requiredMarkValue">
                <Radio.Group>
                    <Radio.Button value="optional">男</Radio.Button>
                    <Radio.Button value>女</Radio.Button>
                    <Radio.Button value={false}>保密</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="格言" required tooltip="必填项">
                <Input placeholder="格言" value={item.motto} />
            </Form.Item>
            <Form.Item
                label="电话"
                required
                tooltip={{
                    title: '联系电话',
                    icon: <InfoCircleOutlined />,
                }}
            >
                <Input placeholder="电话" value={item.phone} />
            </Form.Item>
            <Form.Item>
            </Form.Item>
            <Form.Item>
                <Image src={item.avatarUrl} width={200} height={200} />
                <Upload />
                <Button icon={<UploadOutlined />}>上传图像</Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={() => {
                    onSummit();
                }}>保存</Button>
            </Form.Item>
        </Form>
    );
};

export default ContactForm;