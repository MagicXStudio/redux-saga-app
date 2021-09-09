import { webSocket } from "rxjs/webSocket";
import { Button, Tag, Space, Card, Modal } from 'antd'
import { timer } from 'rxjs';
import { useState } from 'react'
import { base64 } from '../../utils/base64'
import { CommandMsg } from '../../models/CommandMsg'
const RecordSeparatorCode = 0x1e;
const RecordSeparator = String.fromCharCode(RecordSeparatorCode);

const IM = function () {
    const [msg, setMsg] = useState("");
    const onOpen = (value: Event) => {
        handshake();
        heartbeat();
    };

    const onMessage = (msg: unknown) => {
        let m = msg as string;
        setMsg(m);
    };
    const subject = webSocket({
        url: 'ws://106.13.130.51:4327/signalr-hubs/trade',
        binaryType: undefined,
        deserializer: ({ data }) => data,
        serializer: msg => {
            let data = `${JSON.stringify(msg)}${RecordSeparator}`;
            return data;
        },
        openObserver: {
            next: (value: Event) => onOpen(value)
        },
        closeObserver: {
            next: (reason: CloseEvent) => console.error(reason)
        }
    });
    const handshake = () => {
        let cmd: CommandMsg = {
            protocol: 'json',
            id: 2,
            type: 1,
            version: 1,
            target: 'handshake',
            arguments: []
        };
        subject.next(cmd);
    }

    const heartbeat = () => {
        timer(5 * 1000, 1000 * 20).subscribe(count => {
            let cmd: CommandMsg = {
                protocol: 'json',
                id: 2,
                type: 1,
                version: 1,
                target: 'Hearbeat',
                arguments: []
            };
            subject.next(cmd);
        });
    }

    const send = (obj: unknown) => {
        let encode = base64.encode(JSON.stringify(obj));
        let cmd: CommandMsg = {
            id: 1,
            protocol: 'json',
            version: 1,
            type: 1,
            target: 'RequestHandler',
            arguments: [encode]
        };
        subject.next(cmd);
    }
    subject.subscribe(
        msg => onMessage(msg),
        err => {
            console.error(err)
        },
        () => {
            console.info('complete')
        }
    );

    return (<Card>
        <Tag>{msg}</Tag>
        <Button onClick={() => {
            send("helllo");
        }}>发送消息</Button>
        <Button>实时消息推送</Button>
        <Space>实时消息推送</Space>
    </Card>);
};

export default IM;