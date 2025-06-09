import { useState } from 'react';

export default function CounterComponent({ initialCount = 0 }) {

    const [count, setCount] = useState(initialCount || 0);

    function incrementCount(){
        console.log("Incrementing count", count);
        setCount(count + 1);
    }
    
    function decrementCount(){
        console.log("Decrement count", count);
        setCount(count - 1);
    }

    return(
        <div>
            <h1>Counter Component</h1>
            <button onClick={incrementCount}>+</button>
            <button onClick={decrementCount}>-</button>
            Counter Count: { count }
        </div>
    )
}

