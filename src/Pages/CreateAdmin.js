import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { getRole, isExpired, RegisterAsAdmin } from '../methods/Account'
import { GetAvailableForms } from '../methods/DynamicForms'
import 'react-confirm-alert/src/react-confirm-alert.css'

const CreateAdmin = () => {
    const navigate = useNavigate()
    const [forms, setForms] = useState([])
    const [selectedForm, setSelectedForm] = useState()
    const [isLoading, toggleLoading] = useState(true)
    // const [allowedField, setAllowedField] = useState('')

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
                setForms(res)
                toggleLoading(false)
                setSelectedForm(forms[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            permissionType: '',
            allowedForms: '',
            allowedField: '',
            allowedValue: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Oluşturulacak hesaba bir kullanıcı adı atamalısınız.'),
            password: Yup.string().required('Oluşturulacak hesaba bir şifre vermelisiniz.'),
            permissionType: Yup.string().required('Hesabın yetkilerini belirleyin.'),
            // allowedForms: Yup.string().required('Oluşturulacak hesabı, form ile ilişkilendirin.'),
        }),
        onSubmit: (values) => {
            let allowedForms = {}
            if (values.allowedForms === '') {
                allowedForms = {
                    // eslint-disable-next-line no-underscore-dangle
                    formId: '',
                    allowedField: values.allowedField,
                    allowedValue: values.allowedValue,
                }
            } else {
                allowedForms = {
                    // eslint-disable-next-line no-underscore-dangle
                    formId: forms[values.allowedForms]._id,
                    allowedField: values.allowedField,
                    allowedValue: values.allowedValue,
                }
            }
            const data = {
                username: values.username,
                password: values.password,
                permissionType: values.permissionType,
                allowedForms,
            }
            console.log(data)
            RegisterAsAdmin(data)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Başarılı!',
                        text: 'Admin hesabı başarıyla oluşturuldu.',
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'İşlem başarısız.',
                    })
                })
        },
    })
    if (!isLoading) {
        return (
            <div className="container">
                <div className="form-body">
                    <div className="row">
                        <div className="form-holder">
                            <div className="form-content">
                                <div className="form-items">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <h3>Hesap Oluşturma ve Yetkilendirme</h3>
                                            <p>ADMİN HESABI VE İZİNLERİ</p>
                                        </div>
                                    </div>
                                    <form
                                        onSubmit={formik.handleSubmit}
                                        encType="multipart/form-data"
                                    >
                                        <div className="row mt-4">
                                            <div className="form-group col-md-6 col-sm-12">
                                                <label htmlFor="fullname">
                                                    Kullanıcı Adı Atama
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="username"
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Kullanıcı Adı"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.username}
                                                />
                                                {formik.touched.username &&
                                                formik.errors.username ? (
                                                    <p className="formikValidate">
                                                        {formik.errors.username}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <div className="form-group col-md-6 col-sm-12">
                                                <label htmlFor="fullname">Şifre Atama</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    onBlur={formik.handleBlur}
                                                    className="form-control"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.fullname}
                                                />
                                                {formik.touched.password &&
                                                formik.errors.password ? (
                                                    <p className="formikValidate">
                                                        {formik.errors.password}
                                                    </p>
                                                ) : null}
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
                                                        formik.handleChange(e)
                                                        setSelectedForm(e.target.value)
                                                    }}
                                                >
                                                    <option
                                                        value={formik.values.allowedForms}
                                                        disabled
                                                        selected
                                                    >
                                                        Formların Tümü
                                                    </option>
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
                                                {formik.touched.allowedForms &&
                                                formik.errors.allowedForms ? (
                                                    <p className="formikValidate">
                                                        {formik.errors.allowedForms}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <div className="form-group col-md-6 col-sm-12">
                                                <label htmlFor="fullname">Yetkilendirme</label>
                                                <select
                                                    name="permissionType"
                                                    id="permission"
                                                    onChange={formik.handleChange}
                                                    className="form-select"
                                                >
                                                    <option
                                                        value={formik.values.permissionType}
                                                        disabled
                                                        selected
                                                    >
                                                        İşlemler
                                                    </option>
                                                    <option value="read">
                                                        İlgili formu görebilir.
                                                    </option>
                                                    <option value="write">
                                                        İlgili form üzerinde işlem yapabilir.
                                                    </option>
                                                </select>
                                                {formik.touched.permissionType &&
                                                formik.errors.permissionType ? (
                                                    <p className="formikValidate">
                                                        {formik.errors.permission}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>
                                        {selectedForm && (
                                            <div className="row mt-4">
                                                <div className="form-group col-md-6 col-sm-12">
                                                    <label htmlFor="fullname">
                                                        Form İçinde Yetkilendir
                                                    </label>
                                                    <select
                                                        name="allowedField"
                                                        id="allowedField"
                                                        className="form-select"
                                                        onChange={formik.handleChange}
                                                    >
                                                        <option
                                                            value={formik.values.allowedField}
                                                            disabled
                                                            selected
                                                        >
                                                            Seçilen forma ait tüm alanlar
                                                        </option>
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
                                                    <label htmlFor="fullname">
                                                        Yetkili Alanda Belirlenen Değerler
                                                    </label>
                                                    <input
                                                        name="allowedValue"
                                                        id="allowedValue"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={formik.handleChange}
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
                                                className="btn btn-primary mt-4"
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
