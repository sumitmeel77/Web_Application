
import React from 'react'
import { Link } from "react-router-dom"
// import { useState } from 'react';
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index"
import { useDispatch } from "react-redux";

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
async function logout() {
    const cookieData = getCookie("jwt")

    // request made to server
    const output = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cookieData })
    }
    ).then((res) => res.json())
    if (output.status === 'ok') {
        console.log("ok")
        document.cookie = " jwt = 0 "
        window.location.href = "/"

    } else {
        alert(output.error)
    }
}
export default function Navbar() {
    // const [category, setCategory] = useState("")

    const dispatch = useDispatch()
    const { AuthFunc } = bindActionCreators(actionCreators, dispatch)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* for password change pop box */}

                <button type="button" className="btn btn-dark navbar-brand" onClick={() => AuthFunc("general")}>Home</button>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        </li>
                    </ul>
                </div>
                <div className="dropdown me-auto mb-2 mb-lg-0  text-left justify-content-start ">
                    <button className="btn btn-primary dropdown-toggle btn-dark" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        Category
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        <button type="button" className="btn btn-dark dropdown-item" onClick={() => AuthFunc("business")} >business</button>
                        <button type="button" className="btn btn-dark dropdown-item" onClick={() => AuthFunc("entertainment")} >entertainment</button>
                        <button type="button" className="btn btn-dark dropdown-item" onClick={() => AuthFunc("health")} >health</button>
                        <button type="button" className="btn btn-dark dropdown-item" onClick={() => AuthFunc("science")} >science</button>
                        <button type="button" className="btn btn-dark dropdown-item" onClick={() => AuthFunc("sports")}>sports</button>
                        <button type="button" className="btn btn-dark dropdown-item" onClick={() => AuthFunc("technology")}>technology</button>

                    </ul>
                </div>
                <Link to="/password" className="navbar-brand mx-3" style={{ fontSize: "15px" }}>Password <br />Change</Link>
                <button type="button" className="btn btn-dark navbar-brand " onClick={logout}>Logout</button>
            </div>
        </nav>
    )
}
