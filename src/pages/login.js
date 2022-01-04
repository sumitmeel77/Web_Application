import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Link } from "react-router-dom"
async function loginUser(credentials) {
    // request made to server
    const output = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }
    ).then((res) => res.json())
    if (output.status === 'ok') {
        document.cookie = `jwt=${output.data}`
        setTimeout(2000)
        window.location.href = "/Home"

    } else {
        alert(output.error)
    }
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(email)
        await loginUser({
            email,
            password
        });

    }

    return (
        <div className="center">
            <h1>LOGIN</h1>
            <Form onSubmit={handleSubmit} id="login" >
                <div className="txt_field">
                    <Form.Group size="lg" controlId="email">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className="txt_field">
                    <Form.Group size="lg" controlId="password">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <Button block size="lg" type="submit" disabled={!validateForm()} style={{ backgroundColor: "#000000" }}>
                    Login
                </Button>
                <div className="signup_link">
                    <Link to="/">Back</Link>
                </div>
            </Form>

        </div>


    );
}

