/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import '../UserCreate.css'
import camelcase from 'camelcase'
import { PostCreateForms } from '../methods/DynamicForms'

const CreateForms = () => {
    // const [title, setTitle] = useState('Welcome')
    const [subtitle] = useState('CREATE YOUR FORM')

    /*  useEffect(() => {
        document.title = title
    }, [title])
    const changeTitle = (event) => {
        setTitle(event.target.value)
    }
    const SubchangeTitle = (event) => {
        setSubTitle(event.target.value)
    } */

    // { nameForm: '', colorButton: '', file: '', descriptionForm: '' },

    const [formFields, setFormFields] = useState([
        {
            // BODY dinamik yapının
            type: 'String',
            htmlLabel: '',
            textAreaDynamic: '',
            htmlType: '',
            selectOptional: '',
            min: '',
            max: '',
        },
    ])

    const arr = []
    const obj = {}

    const PageInfo = () => {
        // sayfa hakkında bilgiler için
        const formName = document.getElementById('formName').value
        const description = document.getElementById('description').value
        const primaryColor = document.getElementById('primaryColor').value

        obj.formName = formName
        obj.description = description
        obj.primaryColor = primaryColor
        arr.push(obj)
    }

    const componentDynamin = {
        body: [...formFields],
    }
    const componentPage = {
        body: arr,
    }

    const submit = (e) => {
        PageInfo()
        if (obj.formName !== '' && obj.description !== '' && obj.primaryColor) {
            e.preventDefault()

            console.log(componentDynamin)
            console.log(componentPage)

            // post
            const formData = new FormData()
            formData.append(camelcase(obj.formName), componentDynamin)
            formData.append(componentPage)
            // console.log(formData)
            PostCreateForms(formData)
        }
    }
    const handleFormChange = (event, index) => {
        const data = [...formFields]
        data[index][event.target.name] = event.target.value
        setFormFields(data)
    }

    const addFields = (index) => {
        const fieldKontrol = document.getElementById(`fieldInput${index}`).value
        const SelectOptionalKontrol = document.getElementById(`selectOptional${index}`).value
        if (fieldKontrol !== '' && SelectOptionalKontrol !== '') {
            const object = {}
            setFormFields([...formFields, object])
        }
    }

    const removeFields = (index) => {
        const data = [...formFields]
        data.splice(index, 1)
        setFormFields(data)
    }

    const changeTypeInput = (index, e) => {
        const element = e.target.value
        // console.log(index, e)

        document.getElementById(`MaxLength${index}`).style.visibility = 'hidden'
        document.getElementById(`MinLength${index}`).style.visibility = 'hidden'
        document.getElementById(`fieldInput${index}`).style.visibility = ''
        document.getElementById(`fieldInput${index}`).placeholder = ''
        document.getElementById(`fieldInput${index}`).value = ''
        document.getElementById(`textArea${index}`).hidden = true

        if (element === 'text') {
            document.getElementById(`MaxLength${index}`).style.visibility = ''
            document.getElementById(`MinLength${index}`).style.visibility = ''
        } else if (element === 'E-mail') {
            document.getElementById(`fieldInput${index}`).type = 'email'
        } else if (element === 'Text Area') {
            document.getElementById(`textArea${index}`).hidden = false
            document.getElementById(`fieldInput${index}`).type = 'text'
            document.getElementById(`fieldInput${index}`).placeholder = 'Name the Text Area'
        } else if (element === 'Date') {
            document.getElementById(`fieldInput${index}`).type = 'Date'
        } else if (element === 'Number') {
            document.getElementById(`fieldInput${index}`).type = 'Number'
            document.getElementById(`MaxLength${index}`).style.visibility = ''
            document.getElementById(`MinLength${index}`).style.visibility = ''
        } else if (element === 'File') {
            document.getElementById(`fieldInput${index}`).type = 'file'
            // eslint-disable-next-line no-empty
        } else {
        }
    }
    const ChangeColor = (e) => {
        const colors = e.target.value

        if (colors === 'Red') {
            document.getElementById('primaryColor').style.backgroundColor = '#FC3D39'
        } else if (colors === 'Orange') {
            document.getElementById('primaryColor').style.backgroundColor = '#FC3158'
        } else if (colors === 'Yellow') {
            document.getElementById('primaryColor').style.backgroundColor = '#FECB2E'
        } else if (colors === 'Green') {
            document.getElementById('primaryColor').style.backgroundColor = '#53D769'
        } else if (colors === 'Teal Blue') {
            document.getElementById('primaryColor').style.backgroundColor = '#5FC9F8'
        } else if (colors === 'Blue') {
            document.getElementById('primaryColor').style.backgroundColor = '#147EFB'
        } else if (colors === 'Purple') {
            document.getElementById('primaryColor').style.backgroundColor = '#6a0dad'
        } else if (colors === 'Pink') {
            document.getElementById('primaryColor').style.backgroundColor = '#FFC0CB'
        } else if (colors === 'selected') {
            document.getElementById('primaryColor').style.backgroundColor = '#FFFFFF'
            // eslint-disable-next-line no-empty
        } else {
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
                                Welcom
                            </h3>
                            <button
                                id="primaryColor"
                                name="primaryColor"
                                className="form-control col-sm-1"
                                style={{
                                    backgroundColor: 'white',
                                    width: '25px',
                                    height: '25px',
                                    margin: '3px',
                                }}
                            />
                        </div>
                        <p id="subTitle">{subtitle}</p>
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

                <form className="needs-validation" noValidate>
                    <div className="row">
                        <div className="form-group col-md-4 col-sm-4">
                            <div className="form-group">
                                <label style={{ fontWeight: 'bold' }} htmlFor="nameForm">
                                    Name Of The Form
                                </label>
                                <input
                                    type="text"
                                    className="form-control themed-grid-col"
                                    id="formName"
                                    name="formName"
                                    placeholder="e.g: Welcom page"
                                    style={{ backgroundColor: '#f2f8fc' }}
                                />
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <br />
                            <div>
                                <select
                                    onChange={ChangeColor}
                                    className="form-select"
                                    aria-label="Selected Color"
                                >
                                    <option value="selected" selected>
                                        Selected Color
                                    </option>
                                    <option value="Red">Red</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Yellow">Yellow</option>
                                    <option value="Green">Green</option>
                                    <option value="Teal Blue">Teal Blue</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Purple">Purple</option>
                                    <option value="Pink">Pink</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="form-group">
                                <label>Favicon</label>
                                <input type="file" className="form-control" id="file" name="file" />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="form-group">
                            <label style={{ fontWeight: 'bold' }} htmlFor="aboutForm">
                                Description The Form
                            </label>
                            <textarea
                                className="form-control mt-2"
                                name="description"
                                id="description"
                                rows="2"
                                style={{ backgroundColor: '#f2f8fc' }}
                            />
                        </div>
                        <hr className="my-4" />
                    </div>

                    <div className="container-fluid" style={{ visibility: '' }} id="firstDiv">
                        {formFields.map((form, index) => {
                            return (
                                // eslint-disable-next-line react/no-array-index-key
                                <div key={index} className="row" id={`main${index}`}>
                                    <div className="col-sm-3">
                                        <input
                                            name="textForm"
                                            id={`fieldInput${index}`}
                                            name="htmlLabel"
                                            onChange={(evt) => handleFormChange(evt, index)}
                                            placeholder="Please Select a field"
                                            type="text"
                                            className="form-control themed-grid-col"
                                            style={{
                                                backgroundColor: '#f2f8fc',
                                                visibility: '',
                                            }}
                                        />

                                        <textarea
                                            id={`textArea${index}`}
                                            className="form-control"
                                            name="textAreaDynamic"
                                            style={{}}
                                            onChange={(evt) => handleFormChange(evt, index)}
                                            hidden
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <select
                                            id={`select${index}`}
                                            onClick={(evt) => changeTypeInput(index, evt)}
                                            onChange={(evt) => handleFormChange(evt, index)}
                                            className="form-select"
                                            aria-label="Selected Field type"
                                            name="htmlType"
                                        >
                                            <option value="Select Type" selected>
                                                Select Type
                                            </option>
                                            <option value="text">Text</option>
                                            <option value="E-mail">E-mail</option>
                                            <option value="Text Area">Text Area</option>
                                            <option value="Date">Date</option>
                                            <option value="Number">Number</option>
                                            <option value="File">Add File</option>
                                        </select>
                                    </div>

                                    <div className="col-sm-2">
                                        <select
                                            id={`selectOptional${index}`}
                                            onChange={(evt) => handleFormChange(evt, index)}
                                            className="form-select"
                                            name="selectOptional"
                                            aria-label="Selected Field type"
                                        >
                                            <option value="Optional" selected>
                                                Optional
                                            </option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    <div className="col-sm-1">
                                        <input
                                            placeholder="Min"
                                            className="form-control"
                                            id={`MinLength${index}`}
                                            name="min"
                                            onChange={(evt) => handleFormChange(evt, index)}
                                            type="Number"
                                            style={{ visibility: 'hidden' }}
                                        />
                                    </div>
                                    <div className="col-sm-1">
                                        <input
                                            placeholder="Max"
                                            onChange={(evt) => handleFormChange(evt, index)}
                                            className="form-control"
                                            name="max"
                                            id={`MaxLength${index}`}
                                            type="Number"
                                            style={{ visibility: 'hidden' }}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <a
                                            id="addFieldsButton"
                                            className="btn me-2 col-sm-1 form-control"
                                            aria-pressed="true"
                                            role="button"
                                            onClick={() => addFields(index)}
                                            style={{
                                                backgroundColor: 'coral',
                                                color: 'white',
                                            }}
                                        >
                                            +
                                        </a>
                                    </div>
                                    <div className="col-sm-1">
                                        <button
                                            id={`removeFieldsButton${index}`}
                                            className="btn me-2 col-sm-1 form-control"
                                            onClick={(evt) => removeFields(index, evt)}
                                            aria-pressed="true"
                                            style={{ backgroundColor: 'coral', color: 'white' }}
                                        >
                                            -
                                        </button>
                                    </div>

                                    <hr
                                        style={{
                                            height: '1px',
                                            borderWidth: '0',
                                            color: 'whitesmoke',
                                            backgroundColor: 'gray',
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>

                    <div className="row">
                        <div className="col-sm-12" />
                    </div>

                    <br />

                    <div style={{ textAlign: 'center' }}>
                        <button
                            id="submit"
                            type="submit"
                            className="btn btn-primary"
                            onClick={submit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateForms
