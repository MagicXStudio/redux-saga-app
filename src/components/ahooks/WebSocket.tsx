import { useRef, useMemo } from 'react';
import { useWebSocket } from 'ahooks';
import { ReadyState } from 'ahooks/lib/useWebSocket';
import { Tag, Space, Button, Card } from 'antd'

export default () => {
    const messages = useRef<string[]>([]);
    const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
        'ws://106.13.130.51:4327/signalr-hubs/trade',
    );
    messages.current = useMemo(() => messages.current.concat([]), [
        latestMessage,
    ]);
    return (
        <Card>
            <Button
                onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
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
