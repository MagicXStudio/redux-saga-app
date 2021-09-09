import { Card } from 'antd'
import { useToggle } from "ahooks";
import WebSocket from '../components/ahooks/WebSocket'
const Hooks = () => {
    const [state, { toggle }] = useToggle();
    return (
        <Card >
            <WebSocket />
        </Card>);
}
export default Hooks;