import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Link } from "react-router-dom"

async function RegisterUser(credentials) {
    // request made to server
    const output = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }
    ).then((res) => res.json())

    if (output.status === 'ok') {
        window.alert("Registered Successfully")
        window.location.href = "/"
    } else {
        alert(output.error)
    }
}
export default function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function validateForm() {
        if (!username || typeof username !== 'string') {
            return ('Invalid username')
        }
        if (!password || typeof password !== 'string') {
            return ('Invalid password')
        }

        if (password.length < 5) {
            return ('Password too small. Should be atleast 6 characters')
        }
        return email.length > 0;
    }
    const handleSubmit = async e => {
        e.preventDefault();
        await RegisterUser({
            username,
            email,
            password
        });
    }

    return (
        <div className="center">
            <h1>REGISTER</h1>
            <Form onSubmit={handleSubmit} id="register" >
                <div className="txt_field">
                    <Form.Group size="lg" controlId="username">
                        <Form.Control
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Form.Group>
                </div>
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
                    Register
                </Button>
                <div className="signup_link">
                    <Link to="/">Back</Link>
                </div>
            </Form>

        </div>


    );
}
