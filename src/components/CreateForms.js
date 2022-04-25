/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import '../UserCreate.css'

const CreateForms = () => {
    const [title, setTitle] = useState('Welcome')
    const [subtitle] = useState('CREATE YOUR FORM')
    useEffect(() => {
        document.title = title
    }, [title])

    const changeTitle = (event) => {
        setTitle(event.target.value)
    }

    /* const SubchangeTitle = (event) => {
        setSubTitle(event.target.value)
    } */

    const [formFields, setFormFields] = useState([
        {
            textForm: '',
        },
    ])

    const handleFormChange = (event, index) => {
        const data = [...formFields]
        data[index][event.target.name] = event.target.value
        setFormFields(data)
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(formFields)
    }

    const addFields = () => {
        const object = {
            textForm: '',
        }
        setFormFields([...formFields, object])
    }

    /* const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  }; */

    const changeTypeInput = (index, e) => {
        const element = e.target.value
        console.log(index, e)

        document.getElementById(`MaxLength${index}`).style.visibility = 'hidden'
        document.getElementById(`MinLength${index}`).style.visibility = 'hidden'
        document.getElementById(`fieldInput${index}`).style.visibility = ''
        document.getElementById(`fieldInput${index}`).placeholder = ''

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

    const OptionalChoose = (index, e) => {
        const element = e.target.value
        if (element === 'Yes') {
            console.log('Optional')
        } else if (element === 'No') {
            console.log('Not Optional')
            // eslint-disable-next-line no-empty
        } else {
        }
    }

    /* const lengthFieldName = (index) => {
        const lengthSizeMax = document.getElementById(`MaxLength${index}`).value
        const lengthSizeMin = document.getElementById(`MinLength${index}`).value
        document.getElementById(`fieldInput${index}`).maxLength = lengthSizeMax
        document.getElementById(`fieldInput${index}`).minLength = lengthSizeMin
    } */

    /* const icon = () => {
        const Favicon = document.getElementById('file').value
        const favicon = document.getElementById('favicon')
        console.log(Favicon.slice(12))
        favicon.href = Favicon.slice(12)
    } */

    const ChangeColor = (e) => {
        const colors = e.target.value

        if (colors === 'Red') {
            document.getElementById('colorButton').style.backgroundColor = 'red'
        } else if (colors === 'Orange') {
            document.getElementById('colorButton').style.backgroundColor = 'Orange'
        } else if (colors === 'Yellow') {
            document.getElementById('colorButton').style.backgroundColor = 'Yellow'
        } else if (colors === 'Green') {
            document.getElementById('colorButton').style.backgroundColor = 'Green'
        } else if (colors === 'Teal Blue') {
            document.getElementById('colorButton').style.backgroundColor = 'Teal Blue'
        } else if (colors === 'Blue') {
            document.getElementById('colorButton').style.backgroundColor = 'Blue'
        } else if (colors === 'Purple') {
            document.getElementById('colorButton').style.backgroundColor = 'Purple'
        } else if (colors === 'Pink') {
            document.getElementById('colorButton').style.backgroundColor = 'Pink'
        } else if (colors === 'selected') {
            document.getElementById('colorButton').style.backgroundColor = '#FFFFFF'
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
                                {title}
                            </h3>
                            <button
                                id="colorButton"
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
                        <a
                            id="StartButton"
                            className="btn me-2"
                            style={{ backgroundColor: 'coral', color: 'white' }}
                            role="button"
                            aria-pressed="true"
                            onClick={startAdd}
                        >
                            Start Adding
                        </a>
                        <a
                            id="backButton"
                            href="#"
                            className="btn me-2"
                            style={{ backgroundColor: 'coral', color: 'white' }}
                            role="button"
                            aria-pressed="true"
                        >
                            Back
                        </a>
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
                                    id="nameForm"
                                    name="nameForm"
                                    onChange={changeTitle}
                                    placeholder={`e.g: ${title} page`}
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
                                <label htmlFor="file">Favicon</label>
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
                                name="descriptionForm"
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
                                            onChange={(event) => handleFormChange(event, index)}
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
                                            style={{}}
                                            hidden
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <select
                                            id={`select${index}`}
                                            onChange={(evt) => changeTypeInput(index, evt)}
                                            className="form-select"
                                            aria-label="Selected Field type"
                                        >
                                            <option selected />
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
                                            onChange={(evt) => OptionalChoose(index, evt)}
                                            className="form-select"
                                            aria-label="Selected Field type"
                                        >
                                            <option selected>Optional</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    <div className="col-sm-1">
                                        <input
                                            placeholder="Min"
                                            className="form-control"
                                            id={`MinLength${index}`}
                                            type="Number"
                                            style={{ visibility: 'hidden' }}
                                        />
                                    </div>
                                    <div className="col-sm-1">
                                        <input
                                            placeholder="Max"
                                            className="form-control"
                                            id={`MaxLength${index}`}
                                            type="Number"
                                            style={{ visibility: 'hidden' }}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <a
                                            id="addFieldsButton"
                                            className="btn me-2 col-sm-1 form-control"
                                            role="button"
                                            aria-pressed="true"
                                            onClick={addFields}
                                            style={{
                                                backgroundColor: 'coral',
                                                color: 'white',
                                            }}
                                        >
                                            +
                                        </a>
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
                        <a
                            href="#"
                            className="btn btn-outline-primary me-2"
                            role="button"
                            aria-pressed="true"
                            onClick={submit}
                        >
                            Save
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateForms
