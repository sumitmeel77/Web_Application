
import Navbar from '../components/navbar'

import React from 'react'
import News from '../components/News'
import { useSelector } from "react-redux"
// import { bindActionCreators } from "redux";
// import { actionCreators } from "../state/index"
// import { useDispatch } from "react-redux";


export default function Home() {
    const state = useSelector(state => state.loginData)
    console.log(state)
    // const dispatch = useDispatch()
    // const { AuthFunc } = bindActionCreators(actionCreators, dispatch)
    return (
        <div>
            <Navbar />
            {/* <h1>amount {state}</h1>
            <button type="button" className="btn btn-primary" onClick={() => AuthFunc(10)}>Primary</button> */}
            <News category={state} />
        </div>
    )
}
