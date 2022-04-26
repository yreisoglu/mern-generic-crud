import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRole, isExpired, RegisterAsAdmin } from '../methods/Account'
import GetAvailableForms from '../methods/DynamicForms'

const CreateAdmin = () => {
    const navigate = useNavigate()
    const [forms, setForms] = useState([])
    const [selectedForm, setSelectedForm] = useState()
    const [isLoading, toggleLoading] = useState(true)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [permissionType, setPermissionType] = useState('')
    const [allowedField, setAllowedField] = useState('')
    const [allowedValue, setAllowedValue] = useState('')

    useEffect(() => {
        isExpired()
            .then((res) => {
                if (res) {
                    navigate('/dynamic')
                }
                getRole().then((roleResponse) => {
                    if (roleResponse.role !== 'root') navigate('/dynamic')
                })
            })
            .catch((error) => {
                console.error(error)
            })

        GetAvailableForms()
            .then((res) => {
                console.log(res)
                setForms(res)
                toggleLoading(false)
                setSelectedForm(forms[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const submitAdminUser = (event) => {
        event.preventDefault()
        const allowedForms = {
            // eslint-disable-next-line no-underscore-dangle
            formId: forms[selectedForm]._id,
            allowedField,
            allowedValue,
        }
        const data = {
            username,
            password,
            permissionType,
            allowedForms,
        }
        console.log(data)
        RegisterAsAdmin(data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (!isLoading) {
        return (
            <div className="container d-flex justify-content-center bg-white">
                <form className="" onSubmit={submitAdminUser}>
                    <div className="col">
                        <h2 className="row">Create an Admin Account</h2>
                        <div className="row">
                            <label htmlFor="">
                                Username
                                <input type="text" onChange={(e) => setUsername(e.target.value)} />
                            </label>
                        </div>
                        <div className="row">
                            <label htmlFor="">
                                Password
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="row">
                            <label htmlFor="">
                                permission
                                <select
                                    name="permission"
                                    id="permission"
                                    onChange={(e) => setPermissionType(e.target.value)}
                                >
                                    <option value="read">read</option>
                                    <option value="write">write</option>
                                </select>
                            </label>
                        </div>
                        <div className="row">
                            <label htmlFor="">
                                Allowed Forms
                                <select
                                    name="allowedForms"
                                    id="allowedForms"
                                    onChange={(e) => {
                                        setSelectedForm(e.target.value)
                                    }}
                                >
                                    {forms.map((form, index) => {
                                        return (
                                            <option key={form.formName} value={index}>
                                                {form.formName}
                                            </option>
                                        )
                                    })}
                                </select>
                            </label>
                        </div>
                        {selectedForm && (
                            <div className="row">
                                <label htmlFor="allowField">
                                    Allowed Fields
                                    <select
                                        name="allowedField"
                                        id="allowedField"
                                        onChange={(e) => setAllowedField(e.target.value)}
                                    >
                                        {Object.keys(forms[selectedForm].formDetails).map(
                                            (detail) => {
                                                return (
                                                    <option value={detail} key={detail}>
                                                        {detail}
                                                    </option>
                                                )
                                            }
                                        )}
                                    </select>
                                </label>
                            </div>
                        )}
                        {selectedForm && (
                            <div className="row">
                                <label htmlFor="">
                                    Allowed Value
                                    <input
                                        type="text"
                                        onChange={(e) => setAllowedValue(e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                    <button className="btn btn-secondary" type="submit">
                        Save
                    </button>
                </form>
            </div>
        )
    }
    return <div>Loading</div>
}

export default CreateAdmin
