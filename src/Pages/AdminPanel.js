import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isExpired } from '../methods/Account'
import Logout from '../methods/Logout'

const AdminPanel = () => {
    const navigate = useNavigate()

    useEffect(() => {
        isExpired()
            .then((res) => {
                if (res) {
                    console.log(res)
                    navigate('/dynamic')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    return (
        <div>
            admin level
            <button type="button" onClick={() => Logout(navigate)}>
                Logout
            </button>
        </div>
    )
}

export default AdminPanel
