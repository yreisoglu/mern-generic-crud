import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isExpired } from '../methods/Account'
import GetAvailableForms from '../methods/DynamicForms'

const RootPanel = () => {
    const navigate = useNavigate()
    const [forms, setForms] = useState([])
    const [selectedForm, setSelectedForm] = useState()
    const [isLoading, toggleLoading] = useState(true)
    const [allowedForms, setAllowedForms] = useState([])
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

    const submitAdminUser = () => {}

    if (!isLoading) {
        return (
            <div className="container d-flex justify-content-center bg-white">
                <form className="form-body" onSubmit={() => submitAdminUser}>
                    <div className="col">
                        <h2 className="row">Create an Admin Account</h2>
                        <div className="row">
                            <label htmlFor="">
                                Username
                                <input type="text" />
                            </label>
                        </div>
                        <div className="row">
                            <label htmlFor="">
                                Password
                                <input type="password" />
                            </label>
                        </div>
                        <div className="row">
                            <label htmlFor="">
                                permission
                                <select name="permission" id="permission">
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
                                        console.log(selectedForm)
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
                                    <select name="allowedField" id="allowedField">
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
                                    <input type="text" />
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

export default RootPanel
