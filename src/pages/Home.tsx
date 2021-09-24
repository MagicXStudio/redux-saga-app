import { useSetInterval } from '../hooks';
import Clock from '../components/Clock/index'
import React from 'react';
const Home = () => {
    const [value, onChange] = React.useState(new Date());
    useSetInterval(() => {
        const now = new Date();
        onChange(now);
    }, 1000);
    return (<div>
        <Clock
            size={200}
            renderNumbers={true}
            renderMinuteHand={true}
            renderSecondHand={true}
            value={value}
        />
        <Clock
            size={300}
            renderNumbers={true}
            renderMinuteHand={true}
            renderSecondHand={true}
            value={value}
        />
    </div>);
}

export default Home;