import React, { useEffect, useState } from 'react'
import '../UserCreate.css'
import camelcase from 'camelcase'
import useStore from '../store'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputLabel,
    OutlinedInput,
    Select,
    TextField,
    MenuItem,
    FormHelperText,
} from '@mui/material'
import { DeleteOutlined, Add } from '@material-ui/icons'
import Tooltip from '@mui/material/Tooltip'
import { CreateForm } from '../methods/DynamicForms'
import { getRole, isExpired } from '../methods/Account'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const FormCreate = () => {
    const [formFields, setFormFields] = useState([{}])
    const [formName, setFormName] = useState()
    const [selectedColor, setSelectedColor] = useState()
    const [file, setFile] = useState()
    const [formDescription, setFormDescription] = useState()
    const store = useStore()
    const { colors, fieldTypes } = store
    const [errors, setErrors] = useState({
        formName: { status: false, message: null },
        selectedColor: { status: false, message: null },
        file: { status: false, message: null },
        formDescription: { status: false, message: null },
    })
    const navigate = useNavigate()
    useEffect(() => {
        isExpired()
            .then((res) => {
                if (res) {
                    navigate('/dynamic')
                }
                getRole().then((roleResponse) => {
                    if (roleResponse.role !== 'root') navigate('/dynamic/form-list')
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const deleteFormField = (index) => {
        setFormFields(formFields.filter((item) => formFields.indexOf(item) !== index))
    }

    const handleInputChange = (index, event) => {
        const updatedFormFields = [...formFields]

        updatedFormFields[index][event.target.name] =
            event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setFormFields(updatedFormFields)
        clearDynamicErrors(index, event)
    }

    const clearDynamicErrors = (index, event) => {
        const updatedFormFields = [...formFields]
        updatedFormFields[index][event.target.name + 'Error'] = null
    }
    const clearNormalErrors = (errorField) => {
        const updatedErrors = errors
        updatedErrors[errorField] = { status: false, message: null }
    }

    const checkValidation = () => {
        let isValid = true
        const updatedFormFields = [...formFields]
        const updatedErrors = errors
        if (!formName) {
            updatedErrors.formName.status = true
            updatedErrors.formName.message = 'Form Adı boş bırakılamaz'
        }
        if (!selectedColor) {
            updatedErrors.selectedColor.status = true
            updatedErrors.selectedColor.message = 'Bir Renk seçmelisiniz'
        }
        if (!file) {
            updatedErrors.file.status = true
            updatedErrors.file.message = 'Form için bir ikon eklemelisiniz'
        }
        if (!formDescription) {
            updatedErrors.formDescription.status = true
            updatedErrors.formDescription.message = 'Form açıklaması boş bırakılamaz'
        }

        formFields.map((item, index) => {
            if (!item.fieldName) {
                updatedFormFields[index].fieldNameError = 'Alan adı boş bırakılamaz.'
                isValid = false
            }
            if (!item.type) {
                updatedFormFields[index].typeError = 'Alan tipini doldurmalısınız.'
                isValid = false
            }
            if (!item.placeholder) {
                updatedFormFields[index].placeholderError = 'İpucu alanı boş bırakılamaz'
                isValid = false
            }
            if (item.min >= item.max) {
                updatedFormFields[index].minError = 'Minimum değer maksimum değerden yüksek olamaz'
                isValid = false
            }
        })
        setErrors(updatedErrors)
        setFormFields(updatedFormFields)
        if (formFields.length < 2) {
            isValid = false
            toast.error('En az 2 Alan ekleyiniz')
        }
        return isValid
    }
    const submitForm = () => {
        const isValid = checkValidation()
        if (isValid) {
            const formData = new FormData()
            formData.append('file', file)
            const formFieldDetails = {}
            formFields.map((item) => {
                const fieldNameCamelCased = camelcase(item.fieldName)

                formFieldDetails[fieldNameCamelCased] = {
                    type: fieldTypes.find((e) => {
                        return e.typeName === item.type
                    }).type,
                    htmlLabel: item.fieldName,
                    htmlType: fieldTypes.find((e) => {
                        return e.typeName === item.type
                    }).type,
                }
                if (item.required !== '')
                    formFieldDetails[fieldNameCamelCased].required = item.required
                if (item.max > item.min) {
                    if (item.max && item.max > 0)
                        formFieldDetails[fieldNameCamelCased].max = item.max
                    if (item.min) formFieldDetails[fieldNameCamelCased].min = item.min
                }
            })
            const formDetails = {
                formName: formName,
                description: formDescription,
                primaryColor: selectedColor,
            }
            const formStructure = JSON.stringify([formFieldDetails, formDetails])
            formData.append('formStructure', formStructure)
            console.log(formStructure)
            CreateForm(formData)
                // TODO: implement toast notification here accordin to the result of api request
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }
    }

    return (
        <div className="container">
            <div
                className="my-3 p-3 rounded shadow-sm"
                id="bodyColor"
                style={{ backgroundColor: '#FFFFFF' }}
            >
                <br />
                <div className="row">
                    <div className="form-group col-md-3">
                        <div className="row">
                            <h3 id="formTitle" className="mb-3 col-sm-6">
                                Welcome
                            </h3>
                        </div>
                        <p id="subTitle">CREATE YOUR FORM</p>
                    </div>

                    <div style={{ textAlign: 'right' }} className="form-group col-md-9">
                        <Link
                            to={'/dynamic/form-list'}
                            id="backButton"
                            className="btn me-2"
                            style={{ backgroundColor: 'coral', color: 'white' }}
                            aria-pressed="true"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                <hr className="my-4" />

                <form className="needs-validation" noValidate encType="multipart/formData">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <TextField
                                name="formName"
                                id="outlined-basic"
                                sx={{ width: '100%' }}
                                label="Formun Adı"
                                variant="outlined"
                                helperText={errors.formName.message}
                                error={errors.formName.status}
                                onChange={(e) => {
                                    setFormName(e.target.value)
                                    clearNormalErrors(e.target.name)
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormControl
                                sx={{ width: 'auto', display: 'flex' }}
                                error={errors.selectedColor.status}
                            >
                                <InputLabel id="demo-multiple-checkbox-label">
                                    Bir Renk Seçiniz
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    input={<OutlinedInput label="Bir Renk Seçiniz" />}
                                    defaultValue={''}
                                    sx={{ width: '100%' }}
                                    name="selectedColor"
                                    onChange={(e) => {
                                        setSelectedColor(e.target.value)
                                        clearNormalErrors(e.target.name)
                                    }}
                                >
                                    {colors.map((item) => {
                                        return (
                                            <MenuItem value={item.HEX}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div>{item.color} </div>
                                                    <div
                                                        style={{
                                                            height: '15px',
                                                            width: '15px',
                                                            backgroundColor: item.HEX,
                                                            borderRadius: '50%',
                                                            justifySelf: 'flex-end',
                                                        }}
                                                    ></div>
                                                </div>
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                                <FormHelperText>
                                    {errors.selectedColor.message || null}
                                </FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <FormControl error={errors.file.status}>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="file"
                                    name="file"
                                    onChange={(e) => {
                                        setFile(e.target.files[0])
                                        clearNormalErrors(e.target.name)
                                    }}
                                />
                                <FormHelperText>{errors.file.message || null}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>

                    <div className="row align-items-center mx-1 mt-3">
                        <TextField
                            label="Form Açıklaması"
                            multiline
                            rows={2}
                            maxRows={4}
                            name="formDescription"
                            onChange={(e) => {
                                setFormDescription(e.target.value)
                                clearNormalErrors(e.target.name)
                            }}
                            error={errors.formDescription.status}
                            helperText={errors.formDescription.message}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <IconButton
                            onClick={() => setFormFields((formFields) => [...formFields, {}])}
                        >
                            <Tooltip title="Alan Ekle">
                                <Add />
                            </Tooltip>
                        </IconButton>
                    </div>
                    {formFields.map((field, index) => {
                        return (
                            <form onChange={(e) => handleInputChange(index, e)}>
                                <div className="col mt-2 align-items-center">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <TextField
                                                id="outlined-basic"
                                                sx={{ width: '100%' }}
                                                label="Alan Adı"
                                                variant="outlined"
                                                name="fieldName"
                                                value={field.fieldName}
                                                helperText={field.fieldNameError || null}
                                                error={field.fieldNameError}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <FormControl
                                                sx={{ width: 'auto', display: 'flex' }}
                                                error={field.typeError}
                                            >
                                                <InputLabel id="demo-multiple-checkbox-label">
                                                    Alan Tipi
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    input={<OutlinedInput label="Alan Tipi" />}
                                                    name="type"
                                                    value={field.type}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                >
                                                    {fieldTypes.map((item, index) => {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                value={item.typeName}
                                                                className=""
                                                            >
                                                                {item.typeName}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                                <FormHelperText>
                                                    {field.typeError || null}
                                                </FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-2">
                                            <Tooltip title="Kullanıcıya gireceği değer hakkında örnek veri">
                                                <TextField
                                                    id="outlined-basic"
                                                    sx={{ width: '100%' }}
                                                    label="İpucu"
                                                    variant="outlined"
                                                    name="placeholder"
                                                    helperText={field.placeholderError || null}
                                                    error={field.placeholderError}
                                                    type={
                                                        field.type && field.type === 'Sayı'
                                                            ? 'number'
                                                            : 'text'
                                                    }
                                                />
                                            </Tooltip>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-between">
                                            <TextField
                                                disabled={formFields[index].type === 'Tarih'}
                                                name="min"
                                                className="mx-1"
                                                label="Min"
                                                type="number"
                                                value={field.min}
                                                InputProps={{ inputProps: { min: 0 } }}
                                                error={field.minError}
                                                helperText={field.minError || null}
                                            />
                                            <TextField
                                                disabled={formFields[index].type === 'Tarih'}
                                                name="max"
                                                className="mx-1"
                                                label="Maks"
                                                type="number"
                                                value={field.max}
                                                InputProps={{ inputProps: { min: 0 } }}
                                            />
                                        </div>

                                        <div className="col-md-2">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox name="required" />}
                                                    label="Zorunlu alan"
                                                    value={field.required}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-1">
                                            <IconButton
                                                color="error"
                                                onClick={() => {
                                                    deleteFormField(index)
                                                }}
                                            >
                                                <DeleteOutlined />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )
                    })}
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <Button
                            variant="contained"
                            onClick={(e) => {
                                e.preventDefault()
                                submitForm()
                            }}
                        >
                            Kaydet
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormCreate
