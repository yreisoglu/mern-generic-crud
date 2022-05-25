/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
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
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material'
import { DeleteOutlined, Add } from '@material-ui/icons'

const FormCreate = () => {
    const [formFields, setFormFields] = useState([])
    const [formName, setFormName] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [file, setFile] = useState()
    const [formDescription, setFormDescription] = useState()
    const store = useStore()
    const { colors, fieldTypes } = store

    const deleteFormField = (index) => {
        setFormFields(formFields.filter((item) => item.index !== index))
    }
    const handleInputChange = (index, event) => {
        const updatedFormFields = [...formFields]
        updatedFormFields[index][event.target.name] = event.target.value
        console.log(updatedFormFields)
        setFormFields(updatedFormFields)
    }
    const NewInput = (props) => {
        const field = props.field
        return (
            <form
                onChange={(e) => {
                    handleInputChange(field.index, e)
                }}
            >
                <div className="col mt-2 align-items-center">
                    <div className="row">
                        <div className="col-md-3">
                            <TextField
                                id="outlined-basic"
                                sx={{ width: '100%' }}
                                label="Alan Adı"
                                variant="outlined"
                                name="formFields"
                            />
                        </div>
                        <div className="col-md-2">
                            <FormControl sx={{ width: 'auto', display: 'flex' }}>
                                <InputLabel id="demo-multiple-checkbox-label">Alan Tipi</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    input={<OutlinedInput label="Alan Tipi" />}
                                    onChange={(event) => console.log(event.target.value)}
                                    name="type"
                                >
                                    {fieldTypes.map((item) => {
                                        return (
                                            <MenuItem value={item.field} className="">
                                                {item.fieldName}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-4 d-flex justify-content-between">
                            <TextField
                                name="min"
                                className="mx-1"
                                label="Minimum değer"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                            <TextField
                                name="max"
                                className="mx-1"
                                label="Maksimum değer"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                        </div>
                        <div className="col-md-2">
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox name="required" />}
                                    label="Zorunlu alan"
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-1">
                            <IconButton
                                color="error"
                                onClick={() => {
                                    deleteFormField(field.index)
                                }}
                            >
                                <DeleteOutlined />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </form>
        )
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
                        <button
                            id="backButton"
                            className="btn me-2"
                            style={{ backgroundColor: 'coral', color: 'white' }}
                            aria-pressed="true"
                        >
                            Back
                        </button>
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
                                onChange={(e) => {
                                    setFormName(e.target.value)
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormControl sx={{ width: 'auto', display: 'flex' }}>
                                <InputLabel id="demo-multiple-checkbox-label">
                                    Bir Renk Seçiniz
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    input={<OutlinedInput label="Bir Renk Seçiniz" />}
                                    defaultValue={''}
                                    onChange={(e) => {
                                        setSelectedColor(e.target.value)
                                    }}
                                >
                                    {colors.map((item) => {
                                        return (
                                            <MenuItem
                                                value={item.HEX}
                                                className="d-flex justify-content-between"
                                            >
                                                <div
                                                    style={{
                                                        height: '15px',
                                                        width: '15px',
                                                        backgroundColor: item.HEX,
                                                        borderRadius: '50%',
                                                    }}
                                                ></div>
                                                <div>{item.color}</div>
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                name="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mx-1 mt-3">
                        <TextField
                            label="Form Açıklaması"
                            multiline
                            rows={2}
                            maxRows={4}
                            onChange={(e) => {
                                setFormDescription(e.target.value)
                            }}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <IconButton
                            onClick={() =>
                                setFormFields((formFields) => [
                                    ...formFields,
                                    { index: formFields.length },
                                ])
                            }
                        >
                            <Add />
                        </IconButton>
                    </div>
                    {formFields.map((field) => {
                        return <NewInput field={field}></NewInput>
                    })}
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <Button variant="contained" onClick={() => {}}>
                            Kaydet
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormCreate
