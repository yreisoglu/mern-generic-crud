import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import { getRole, isExpired } from '../methods/Account'
import { CreateAdminAccount, GetAvailableForms } from '../methods/DynamicForms'
import 'react-confirm-alert/src/react-confirm-alert.css'
import AdminPanelDetail from './AdminPanelDetail'
import useStore from '../store'

const CreateAdmin = () => {
    const navigate = useNavigate()
    const [forms, setForms] = useState([])
    const [isLoading, toggleLoading] = useState(true)
    const [formPermission, setFormPermission] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const store = useStore()
    const { toggleUpdate } = store

    const handleAddFields = () => {
        setFormPermission([...formPermission, {}])
    }

    const handleRemoveFieldsParent = (index) => {
        formPermission.splice(index, 1)
        setFormPermission([...formPermission])
    }
    const valueArray = []

    const handlePermissionValueParent = (index) => {
        let isExist = false
        valueArray.forEach((item) => {
            if (item.formId === index.formId) {
                isExist = true
            }
        })
        if (!isExist) {
            valueArray.push(index)
        } else {
            Swal.fire({
                icon: 'Geçersiz',
                title: 'Bu izini daha önce gerçekleştirdiniz.',
            })
        }
    }

    const handleSubmit = (e) => {
        const body = {}
        body.username = username
        body.password = password
        body.allowedForms = valueArray

        CreateAdminAccount(body)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Başarılı!',
                    text: 'Hesap başarıyla oluşturuldu.',
                })
                toggleUpdate()
                console.log(res)
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'Hata!',
                    title: 'Hesap oluşturma işlemi gerçekleştirilemedi.',
                })
                console.log(error)
            })
        e.preventDefault()
    }

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
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="row mt-2">
                                            <div className="form-group col-md-6 col-sm-12">
                                                <label htmlFor="fullname">
                                                    Kullanıcı Adı Atama
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Kullanıcı Adı"
                                                    onChange={(e) => {
                                                        setUsername(e.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className="form-group col-md-6 col-sm-12">
                                                <label htmlFor="fullname">Şifre Atama</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        setPassword(e.target.value)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-4 justify-content-center">
                                            <div className="form-group col-auto">
                                                <button
                                                    id="addForm"
                                                    type="button"
                                                    style={{ background: '#495056' }}
                                                    onClick={() => handleAddFields()}
                                                    className="btn btn-sm text-white"
                                                >
                                                    <small>Form ve Yetkilerini Belirle</small>
                                                    <AddCircleSharpIcon
                                                        htmlColor="white"
                                                        fontSize="small"
                                                        style={{ marginLeft: '5px' }}
                                                    />
                                                </button>
                                            </div>
                                            <div className="col-auto">
                                                <p className="mt-2" style={{ fontSize: '12px' }}>
                                                    (Oluşturuduğunuz hesabı; birden çok form ile
                                                    ilişkilendirebilir, aynı zamanda form içinde
                                                    yetkilendirme işlemi gerçekleştirebilirsiniz.
                                                    Seçim yapmadığınız takdirde tüm formlara erişimi
                                                    olan bir hesap oluşturursunuz. Aynı zamanda
                                                    seçilen bir form içinde de yetkilendirme işlemi
                                                    gerçekleştirebilirsiniz.)
                                                </p>
                                            </div>
                                        </div>
                                        {formPermission.map((item, index) => {
                                            return (
                                                <AdminPanelDetail
                                                    key={index}
                                                    data={forms}
                                                    index={index}
                                                    handleRemoveFieldsParent={
                                                        handleRemoveFieldsParent
                                                    }
                                                    handlePermissionValueParent={
                                                        handlePermissionValueParent
                                                    }
                                                />
                                            )
                                        })}
                                        <div
                                            style={{ textAlign: 'center' }}
                                            className="form-button mt-4"
                                        >
                                            <button
                                                style={{ background: 'coral ' }}
                                                id="submit"
                                                type="submit"
                                                className="btn btn-primary mt-4"
                                                onClick={handleSubmit}
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
