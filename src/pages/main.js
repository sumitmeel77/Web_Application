import React from 'react'
import "./main.css"
import { Link } from "react-router-dom"
// import { Navigate } from 'react-router';
export default function Main() {

    function getCookie(cname) {
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
    async function UserData() {
        const cookievalue = getCookie("jwt")

        // request made to server
        const output = await fetch("http://localhost:5000/api/userData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cookievalue })
        }
        ).then((res) => res.json())
        if (output.status === 'found' && cookievalue !== "") {
            window.location.href = "/home";

        } else {
            // <Navigate to="/login" />
            window.location.href = "/login";
        }
    }
    return (
        <div style={{ overflow: "hidden" }}>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>Web Application</h2>
                    <p>-by Sumit Meel</p>
                </div>
            </div>
            <div className="main">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4" style={{ marginLeft: "30%" }}>
                            <button type="submit" className="btn btn-black" onClick={UserData}>Login</button>
                            <Link to="/register"><button type="submit" className="btn btn-secondary" >Register</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
