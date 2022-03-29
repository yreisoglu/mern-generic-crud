import { useState, useEffect } from "react";
import { isExpired, Login } from "../methods/Login";
import { useNavigate } from "react-router-dom";
import React from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        isExpired().then(res => {
            if (!res) {
                navigate("/users")
            }
        })
    }, [])
    const handleLogin = () => {
        Login(username, password)
            .then(res => {
                if (res.status == "200") {
                    console.log(res.data.token)
                    localStorage.setItem("jwt", res.data.token)
                    navigate("/users")
                }
            }).catch(err => {
                console.log(err)
            })

    }
    return (
        <div className="container vh-100">
            <div className="col h-100 justify-content-center align-items-center d-flex flex-column ">
                <div className="row  my-1">
                    <input className="p-2" type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className="row  my-1">
                    <input className="p-2" type="text" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="row my-1 ">
                    <button className="btn btn-secondary" onClick={() => handleLogin()} >Login</button>
                </div>
            </div>

        </div>
    )
}

export default LoginPage;