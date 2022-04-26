import React, { useEffect, useState } from 'react'
import '../UserCreate.css'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import DynamicFeedRoundedIcon from '@material-ui/icons/DynamicFeedRounded'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import GetAvailableForms from '../methods/DynamicForms'

const AdminPanel = () => {
    const [data, setData] = useState([])
    const [isChecked, setChecked] = useState(false)
    const [search, setSearch] = useState('')

    const countChecked = () => {
        let count = 0
        data.map((form) => {
            if (form.isChecked) {
                count++
            }
        })
        return count > 1 ? true : false
    }

    useEffect(() => {
        let condition = countChecked()
        setChecked(condition)
    }, [data])

    useEffect(() => {
        setData(data)
    }, [])

    useEffect(() => {
        GetAvailableForms().then((response) => {
            setData(response)
        })
    }, [])

    const handleChange = (e) => {
        const { name, checked } = e.target
        if (name === 'allSelect') {
            let tempForm = data.map((form) => {
                return { ...form, isChecked: checked }
            })
            setData(tempForm)
        } else {
            let tempForm = data.map((form) =>
                form.formName === name ? { ...form, isChecked: checked } : form
            )
            setData(tempForm)
        }
    }
    console.log(search)
    return (
        <div className="container">
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <h3>Welcome Admin</h3>
                                        <p>MANAGE YOUR FORMS</p>
                                    </div>
                                    <div
                                        style={{ textAlign: 'center' }}
                                        className="form-group col-md-4"
                                    >
                                        <input
                                            className="form-control border-end-0 border rounded-pill"
                                            type="text"
                                            placeholder="Arama..."
                                            id="example-search-input"
                                            onChange={(e) => {
                                                setSearch(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{ textAlign: 'right' }}
                                        className="form-group col-md-4 mt-2"
                                    >
                                        {isChecked !== true ? (
                                            <button
                                                type="button"
                                                id="add"
                                                className="btn btn-success btn-sm"
                                            >
                                                <AddCircleSharpIcon
                                                    htmlColor="white"
                                                    fontSize="small"
                                                    marginRight={1}
                                                />
                                                <small> Ekle </small>
                                            </button>
                                        ) : (
                                            ''
                                        )}
                                        {isChecked !== true ? (
                                            <button
                                                style={{ marginLeft: '0.4rem', color: 'white' }}
                                                type="button"
                                                id="update"
                                                className="btn btn-info btn-sm"
                                            >
                                                <DynamicFeedRoundedIcon
                                                    htmlColor="white"
                                                    fontSize="small"
                                                    marginRight={1}
                                                />
                                                <small> Gör </small>
                                            </button>
                                        ) : (
                                            ''
                                        )}
                                        {isChecked !== true ? (
                                            <button
                                                style={{ marginLeft: '0.3rem', color: 'white' }}
                                                type="button"
                                                className="btn btn-warning btn-sm"
                                            >
                                                {' '}
                                                <RateReviewRoundedIcon
                                                    htmlColor="white"
                                                    fontSize="small"
                                                    marginRight={1}
                                                />
                                                <small> Güncelle </small>
                                            </button>
                                        ) : (
                                            ''
                                        )}
                                        <button
                                            style={{ marginLeft: '0.4rem' }}
                                            type="button"
                                            id="sil"
                                            className="btn btn-danger btn-sm"
                                        >
                                            <DeleteForeverRoundedIcon
                                                htmlColor="white"
                                                fontSize="small"
                                                marginRight={1}
                                            />
                                            <small style={{ marginLeft: '-4px' }}> Sil </small>
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 mt-1">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                name="allSelect"
                                                type="checkbox"
                                                checked={
                                                    !data.some((form) =>
                                                        form.isChecked !== true ? true : false
                                                    )
                                                }
                                                onChange={handleChange}
                                            />
                                            <label>Tümünü Seç</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {data
                                        .filter((form) => {
                                            if (search === '') {
                                                return form
                                            } else if (
                                                form.formName
                                                    .toLowerCase()
                                                    .includes(search.toLowerCase())
                                            ) {
                                                return form
                                            }
                                        })
                                        .map((form) => (
                                            <div className="form-group col-xl-6 col-md-6 col-sm-12 mt-5">
                                                <a href="#">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <div className="row">
                                                                <div className="col-md-12 col-sm-12 mt-1">
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            name={form.formName}
                                                                            checked={
                                                                                form.isChecked
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onChange={handleChange}
                                                                        />
                                                                        <label>
                                                                            {form.formName}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="form-group col-md-12 col-sm-12">
                                                                {/* <p class="card-text">
                                                                <small
                                                                    style={{ fontWeight: '100' }}
                                                                >
                                                                    İçindeki veri:{' '}
                                                                </small>{' '}
                                                                {form.countData}{' '}
                                                            </p> */}
                                                                {/* <p className="card-text">
                                                                <small
                                                                    style={{ fontWeight: '100' }}
                                                                >
                                                                    Oluşturulma Tarihi:{' '}
                                                                </small>{' '}
                                                                {form.createdAt}
                                                            </p> */}
                                                                <p className="card-text">
                                                                    {form.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel
