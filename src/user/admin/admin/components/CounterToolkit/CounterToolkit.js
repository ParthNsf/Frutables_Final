import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../../../../../reduxToolkit/counterSlice'

const CounterToolkit = () => {
    const countintoolkit = useSelector((state) => state.counterToolkit)
    console.log(countintoolkit);
    const dispatch = useDispatch()

    const Increment = () => {
        dispatch(increment())
    }

    const Decrement = () => {
        dispatch(decrement())
    }
    return (
        <>
            <h1>Counter Redux-Toolkit</h1>
            <button onClick={Increment}>Increment +</button>
            <div>Counter : {countintoolkit.count}</div>
            <button onClick={Decrement}>Decrement -</button>
        </>
    )
}

export default CounterToolkit
