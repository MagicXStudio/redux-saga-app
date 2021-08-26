import { Button, Tag, Space } from 'antd'
import { of } from 'rxjs'
const Help = () => {
    return (<div >
        <Space>
            <Space >
                <span className="learn">Learn </span>
            </Space>
            <a
                className="App-link"
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                React
          </a>
            <span>, </span>
            <a
                className="App-link"
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Redux
          </a>
            <span>, </span>
            <a
                className="App-link"
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Redux Toolkit
          </a>
            <a
                className="App-link"
                href="https://react-redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                React Redux
          </a>
            <Button type='primary' onClick={() => {
                let x = of(123);
                console.log(x);
            }}>hello rxjs</Button>
        </Space>

        <Button type='primary'>Help</Button>
    </div>);
}
export default Help;