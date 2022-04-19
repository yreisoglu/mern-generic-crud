import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isExpired } from '../methods/Account'

const AdminPanel = () => {
    const navigate = useNavigate()

    useEffect(() => {
        isExpired()
            .then((res) => {
                if (res) {
                    console.log(res)
                    navigate('/dynamic/login')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    return <div>admin level</div>
}

export default AdminPanel
