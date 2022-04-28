import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRole, isExpired, RegisterAsAdmin } from '../methods/Account'
import { GetAvailableForms } from '../methods/DynamicForms'

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
            <div className="container">
                <div className="form-body">
                    <div className="row">
                        <div className="form-holder">
                            <div className="form-content">
                                <div className="form-items">
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <h3>Yeni Hesap</h3>
                                            <p>HESAP OLUŞTURMA VE YETKİLENDİRME</p>
                                        </div>
                                    </div>
                                    <form onSubmit={submitAdminUser} encType="multipart/form-data">
                                        <div className="row mt-4">
                                            <div className="form-group col-md-6 col-sm-12">
                                                <label htmlFor="fullname">Kullanıcı Adı</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Kullanıcı Adı"
                                                    name="fullname"
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group col-md-6 col-sm-12">
                                                <label htmlFor="fullname">Şifre</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="form-group col-md-6 col-sm-12">
                                                <label htmlFor="fullname">Form Atama</label>
                                                <select
                                                    name="allowedForms"
                                                    id="allowedForms"
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        setSelectedForm(e.target.value)
                                                    }}
                                                >
                                                    {forms.map((form, index) => {
                                                        return (
                                                            <option
                                                                key={form.formName}
                                                                value={index}
                                                            >
                                                                {form.formName}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="form-group col-md-6 col-sm-12">
                                                <label htmlFor="fullname">Yetkilendirme</label>
                                                <select
                                                    name="permission"
                                                    id="permission"
                                                    onChange={(e) =>
                                                        setPermissionType(e.target.value)
                                                    }
                                                    className="form-select"
                                                >
                                                    <option value="read">
                                                        İlgili formu görebilir.
                                                    </option>
                                                    <option value="write">
                                                        İlgili form üzerinde işlem yapabilir.
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        {selectedForm && (
                                            <div className="row mt-4">
                                                <div className="form-group col-md-6 col-sm-12">
                                                    <label htmlFor="fullname">Alan Atama</label>
                                                    <select
                                                        name="allowedField"
                                                        id="allowedField"
                                                        className="form-select"
                                                        onChange={(e) =>
                                                            setAllowedField(e.target.value)
                                                        }
                                                    >
                                                        {Object.keys(
                                                            forms[selectedForm].formDetails
                                                        ).map((detail) => {
                                                            return (
                                                                <option value={detail} key={detail}>
                                                                    {detail}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6 col-sm-12">
                                                    <label htmlFor="fullname">Değer Atama</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="fullname"
                                                        onChange={(e) =>
                                                            setAllowedValue(e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div
                                            style={{ textAlign: 'center' }}
                                            className="form-button mt-4"
                                        >
                                            <button
                                                style={{ background: 'coral ' }}
                                                id="submit"
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Kaydet
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <div>Loading</div>
}

export default CreateAdmin
