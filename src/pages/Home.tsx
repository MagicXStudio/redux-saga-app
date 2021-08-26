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
            size={120}
            renderNumbers={true}
            renderMinuteHand={true}
            renderSecondHand={true}
            value={value}
        />
        <b>{value.toLocaleString()}</b>
    </div>);
}

export default Home;