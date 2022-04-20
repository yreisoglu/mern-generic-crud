import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logout from '../methods/Logout'

const RootPanel = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Link to="/dynamic/create-admin">Create Admin</Link>
            <button type="button" onClick={() => Logout(navigate)}>
                Logout
            </button>
        </div>
    )
}

export default RootPanel
