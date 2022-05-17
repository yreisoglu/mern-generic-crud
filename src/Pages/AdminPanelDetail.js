import React, { useState } from 'react'
import '../UserCreate.css'

const AdminPanelDetail = (props) => {
    const [show, setShow] = useState(false)
    const [inputType, setInputType] = useState()
    const [selectedForm, setSelectedForm] = useState()
    const [formId, setFormId] = useState('')
    const [allowedField, setAllowedField] = useState('')
    const [allowedValue, setAllowedValue] = useState('')
    const [permissionType, setPermissionType] = useState('')
    // console.log(formId)
    const handleRemoveFieldsChild = () => {
        props.handleRemoveFieldsParent(props.index)
    }
    const valuesChild = {
        formId: formId,
        allowedField: allowedField,
        allowedValue: allowedValue,
        permissionType: permissionType,
    }

    const handlePermissionValueChild = () => {
        props.handlePermissionValueParent(valuesChild)
    }

    return (
        <div className="row mt-4 p-5" style={{ border: 'solid 1px coral' }}>
            <div className="form-group col-12 col-md-4 col-sm-4">
                <label htmlFor="fullname">Form Atama</label>
                <select
                    name="allowedForms"
                    id="allowedForms"
                    className="form-select"
                    onChange={(e) => {
                        setSelectedForm(e.target.value)
                        setFormId(props.data[e.target.value]._id)
                    }}
                >
                    <option selected disabled>
                        Form Seç
                    </option>
                    {props.data.map((form, index) => {
                        return (
                            <option key={form.formName} value={index}>
                                {form.formName}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="form-group col-12 col-md-5 col-sm-5">
                <label htmlFor="fullname">Yetkilendirme</label>
                <select
                    name="permissionType"
                    onChange={(e) => {
                        setPermissionType(e.target.value)
                    }}
                    id="permission"
                    className="form-select"
                >
                    <option value="read">Görebilir. (Listeleme)</option>
                    <option value="write">İşlem yapabilir. (Listeleme/Güncelleme/Silme)</option>
                </select>
            </div>
            <div className="form-check col-12 col-md-2 col-sm-2">
                <div style={{ float: 'right' }} className="form-group mt-4">
                    <input
                        onClick={() => setShow(!show)}
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                    />
                    <label>Yetkiyi Özelleştir</label>
                </div>
            </div>
            {show ? (
                <div className="row">
                    {props.data[selectedForm] ? (
                        <div className="row">
                            <div className="form-group col-12 col-md-6 col-sm-6 mt-4">
                                <label htmlFor="fullname">Form İçinde Yetkilendir</label>
                                <select
                                    name="allowedField"
                                    id="allowedField"
                                    className="form-select"
                                    onChange={(e) => {
                                        setInputType(
                                            props.data[selectedForm].formDetails[e.target.value]
                                                .type
                                        )
                                        setAllowedField(e.target.value)
                                    }}
                                >
                                    <option selected disabled>
                                        Forma ait bir alan seçiniz.
                                    </option>
                                    {Object.entries(props.data[selectedForm].formDetails).map(
                                        ([detail, value]) => {
                                            return (
                                                <option key={value.type} value={detail}>
                                                    {detail} / {value.type}
                                                </option>
                                            )
                                        }
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-12 col-md-6 col-sm-6 mt-4">
                                <label htmlFor="fullname">Yetkili Alana Değer Atama</label>
                                <input
                                    name="allowedValue"
                                    id="allowedValue"
                                    type={inputType}
                                    className="form-control mt-1"
                                    onChange={(e) => {
                                        setAllowedValue(e.target.value)
                                    }}
                                />
                            </div>{' '}
                        </div>
                    ) : (
                        <div className="row">
                            {' '}
                            <p className="formikValidate">
                                Form seçimi yapmadan yetki özelleştirilemez.
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                ''
            )}
            <div className="row">
                <div className="form-group col-12 col-md-12 col-sm-12">
                    <div style={{ textAlign: 'right' }} className="form-group mt-4">
                        <button
                            type="button"
                            id="removeForm"
                            className="btn btn-danger btn-sm"
                            style={{ marginLeft: '5px' }}
                            onClick={(e) => handleRemoveFieldsChild(e.target)}
                        >
                            Sil
                        </button>
                        <button
                            type="button"
                            id="removeForm"
                            className="btn btn-success btn-sm"
                            style={{ marginLeft: '5px' }}
                            onClick={(e) => handlePermissionValueChild(e.target)}
                        >
                            Ekle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanelDetail
