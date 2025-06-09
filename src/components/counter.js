import { useEffect, useState } from 'react';

export default function CounterComponent({ initialCount = 0 }) {

    const [count, setCount] = useState(initialCount || 0);
    const [message, setMessage] = useState("Start counting...");

    function incrementCount(){
        console.log("Incrementing count", count);
        setCount(count + 1);
    }

    function decrementCount(){
        console.log("Decrement count", count);
        setCount(count - 1);
    }

    useEffect(() =>{
        console.log("useEffect called", count);
        if(count > 20){
            setMessage("You are above 20!!!");
        }
        else if(count > 10){
            setMessage("You are above 10!!!");
        }
        else if(count < 0){
            setMessage("You are negative!!!");
        }
        else {
            setMessage("You are below 10!!!");
        }
    }, [count]);

    return(
        <div>
            <h1>Counter Component</h1>
            <button onClick={incrementCount}>+</button>
            <button onClick={decrementCount}>-</button>
            Counter Count: { count }
            <div>
                <h2>{ message }</h2>
            </div>
        </div>
    )
}

