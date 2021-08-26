import { Button,Tag } from 'antd'
import { useToggle } from "ahooks";
import News from '../components/News'
const Docs = () => {
    const [state, { toggle }] = useToggle();
    return (<div >
        <Tag>useToggle : {String(state)}</Tag>
        <Button type='primary' onClick={() => toggle()}>Docs Toggle</Button>
        <News />
    </div>);
}
export default Docs;