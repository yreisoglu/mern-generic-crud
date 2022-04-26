import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getRole, isExpired } from '../methods/Account'
import Logout from '../methods/Logout'

const RootPanel = () => {
    const navigate = useNavigate()
    useEffect(() => {
        isExpired()
            .then((res) => {
                if (res) {
                    navigate('/dynamic/login')
                }
                getRole().then((roleResponse) => {
                    if (roleResponse.role !== 'root') navigate('/dynamic')
                })
            })
            .catch((error) => {
                console.error(error)
            })
    })
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
