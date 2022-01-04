import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
// import Modal from 'react-bootstrap-modal'


// function MyVerticallyCenteredModal(props) {
//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Modal heading
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <h4>Centered Modal</h4>
//                 <p>
//                     Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//                     dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//                     consectetur ac, vestibulum at eros.
//                 </p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <button type="button" className="btn btn-primary" onClick={props.onHide}>Primary</button>
//             </Modal.Footer>
//         </Modal>
//     );
// }
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
async function UpdatePassword(credentials) {
    // request made to server
    const output = await fetch("http://localhost:5000/api/change-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }
    ).then((res) => res.json())
    if (output.status === 'ok') {
        window.location.href = "/Home"

    } else {
        alert(output.error)
    }
}
export default function Password() {
    // const [modalShow, setModalShow] = React.useState(false);
    const [password, setPassword] = useState("");


    function validateForm() {
        if (!password || typeof password !== 'string') {
            return ('Invalid password')
        }

        if (password.length < 5) {
            return ('Password too small. Should be atleast 6 characters')
        }
        return password.length > 0;
    }
    let cookiedata = getCookie("jwt");
    const handleSubmit = async e => {
        e.preventDefault();

        await UpdatePassword({
            newpassword: password,
            token: cookiedata
        });

    }
    return (
        <div>
            {/* <button type="button" className="btn btn-primary" onClick={() => setModalShow(true)}>Primary</button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            /> */}
            <div className="center">
                <h1>Change Password</h1>
                <Form onSubmit={handleSubmit} id="password" >
                    <div className="txt_field">
                        <Form.Group size="lg" controlId="password">
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <Button block size="lg" type="submit" disabled={!validateForm()} style={{ backgroundColor: "#000000" }}>
                        Submit
                    </Button>
                    <div className="signup_link">
                        <Link to="/home">Back</Link>
                    </div>
                </Form>

            </div>
        </div>
    )
}
