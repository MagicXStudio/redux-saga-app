import { useRef, useMemo } from 'react';
import { useWebSocket } from 'ahooks';
import { ReadyState } from 'ahooks/lib/useWebSocket';
import { Tag, Space, Button, Card } from 'antd'
import { timer } from 'rxjs';
import { CommandMsg } from '../../models/CommandMsg'
export default () => {
    const messages = useRef<CommandMsg[]>([]);
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
            webSocketIns?.send(JSON.stringify(cmd));
        });
    }

    const { readyState, sendMessage, latestMessage, disconnect, connect, webSocketIns } = useWebSocket('ws://106.13.130.51:4327/signalr-hubs/trade',
        {
            reconnectLimit: 3,
            reconnectInterval: 1000,
            manual: true,
            onOpen: (event: Event) => {
                let cmd: CommandMsg = {
                    id: 2,
                    protocol: 'json',
                    type: 1,
                    version: 1,
                    target: 'handshake',
                    arguments: [new Date().toString()]
                };
                console.info(event);
                webSocketIns?.send(JSON.stringify(cmd));
                heartbeat();
            },
            onClose: (event: CloseEvent) => {
                console.info(event);
            },
            onMessage: (msg: MessageEvent) => {
                console.info(msg);
            },
            onError: (error: Event) => {
                console.error(error);
            }
        }
    );
    messages.current = useMemo(() => messages.current.concat([]), [
        latestMessage,
    ]);
    return (
        <Card>
            <Button
                onClick={() => {
                    let cmd: CommandMsg = {
                        id: 2,
                        protocol: 'json',
                        type: 1,
                        version: 1,
                        target: 'MsgHandler',
                        arguments: [new Date().toString()]
                    };
                    sendMessage!(JSON.stringify(cmd));
                }}
                disabled={readyState !== ReadyState.Open}
                style={{ marginRight: 8 }}
            >
                ✉️ 发送
      </Button>
            <Button
                onClick={() => disconnect && disconnect()}
                disabled={readyState !== ReadyState.Open}
                style={{ marginRight: 8 }}
            >
                ❌ 断开连接
      </Button>
            <Button onClick={() => connect && connect()} disabled={readyState === ReadyState.Open}>
                📞 建立连接
      </Button>
            <Tag style={{ marginTop: 8 }}>readyState: {readyState}</Tag>
            <Card style={{ marginTop: 8 }}>
                <Space>received message: </Space>
                {messages.current.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </Card>
        </Card>
    );
};
