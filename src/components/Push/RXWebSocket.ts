import { useUnmount, usePersistFn } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { timer } from 'rxjs';
import { CommandMsg } from '../../models/CommandMsg'
const RecordSeparatorCode = 0x1e;
const RecordSeparator = String.fromCharCode(RecordSeparatorCode);

export interface Options {
    reconnectLimit?: number;
    reconnectInterval?: number;
    manual?: boolean;
}

export interface Result {
    latestMessage?: CommandMsg;
    sendMessage?: (message: any) => void;
    disconnect?: () => void;
    connect?: () => void;
    readyState: number;
    webSocketIns?: WebSocketSubject<CommandMsg>;
}

export default function RXWebSocket(socketUrl: string, options: Options = {}): Result {
    const {
        reconnectLimit = 3,
        reconnectInterval = 3 * 1000,
        manual = false,
    } = options;

    const onOpen = (event: Event) => {
        reconnectTimesRef.current = 0;
        handshake();
        heartbeat();
    };
    const onClose = (event: CloseEvent) => {
        reconnect();
    };
    const onMessage = (message: CommandMsg) => {
        setLatestMessage(message);
    };
    const onError = (error: Event) => { };


    const handshake = () => {
        let handshakeCmd: CommandMsg = {
            protocol: 'json',
            id: 2,
            type: 1,
            version: 1,
            target: 'Handshake',
            arguments: []
        };
        websocketRef.current?.next(handshakeCmd);
    }

    const heartbeat = () => {
        timer(5 * 1000, 1000 * 20).subscribe(count => {
            let cmd: CommandMsg = {
                id: 2,
                protocol: 'json',
                type: 1,
                version: 1,
                target: 'Hearbeat',
                arguments: [count.toString()]
            };
            websocketRef.current?.next(cmd);
        });
    }
    const reconnectTimesRef = useRef(0);
    const reconnectTimerRef = useRef<NodeJS.Timeout>();
    const websocketRef = useRef<WebSocketSubject<CommandMsg>>();

    const [latestMessage, setLatestMessage] = useState<CommandMsg>();
    const [readyState, setReadyState] = useState<number>(1);

    /**
     * 重连
     */
    const reconnect = usePersistFn(() => {
        if (
            reconnectTimesRef.current < reconnectLimit
        ) {
            reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);

            reconnectTimerRef.current = setTimeout(() => {
                connectWs();
                reconnectTimesRef.current++;
            }, reconnectInterval);
        }
    });

    const connectWs = usePersistFn(() => {
        reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);

        if (websocketRef.current) {

        }
        try {
            websocketRef.current = webSocket({
                url: socketUrl,
                binaryType: undefined,
                deserializer: ({ data }) => data,
                serializer: msg => {
                    let data = `${JSON.stringify(msg)}${RecordSeparator}`;
                    return data;
                },
                openObserver: {
                    next: (event: Event) => onOpen(event)
                },
                closeObserver: {
                    next: (reason: CloseEvent) => console.error(reason)
                }
            });
            websocketRef.current.subscribe(
                msg => onMessage(msg),
                err => {
                    console.error(err)
                },
                () => {
                    console.info('complete')
                }
            );
            websocketRef.current.error = (error) => {
                reconnect();
                onError && onError(error);
            };

        } catch (error) {
            throw error;
        }
    });

    /**
     * 发送消息
     * @param message
     */
    const sendMessage = usePersistFn((message: any) => {
        if (readyState === 1) {
            websocketRef.current?.next(message);
        } else {
            throw new Error('WebSocket disconnected');
        }
    });

    /**
     * 手动 connect
     */
    const connect = usePersistFn(() => {
        reconnectTimesRef.current = 0;
        connectWs();
    });

    /**
     * disconnect websocket
     */
    const disconnect = usePersistFn(() => {
        reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);

        reconnectTimesRef.current = reconnectLimit;
        websocketRef.current?.unsubscribe();
    });

    useEffect(() => {
        // 初始连接
        if (!manual) {
            connect();
        }
    }, [socketUrl, manual]);

    useUnmount(() => {
        disconnect();
    });

    return {
        latestMessage,
        sendMessage,
        connect,
        disconnect,
        readyState,
        webSocketIns: websocketRef.current,
    };
}
