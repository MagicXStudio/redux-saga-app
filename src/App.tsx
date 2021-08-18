import logo from './logo.svg';
import News from './components/News'
import './App.css';
import {of} from 'rxjs'
import {Button,Tag} from 'antd'
import 'antd/dist/antd.css'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <News />
                <span>
                    <Tag>Learn </Tag>
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
          <Button type='primary' onClick={()=>{
              let x=of(123);
              console.log(x);
          }}>hello rxjs</Button>
                </span>
            </header>
        </div>
    );
}

export default App;
