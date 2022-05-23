import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import {
    DeleteFormDocuments,
    GetForm,
    GetFormDetails,
    UpdateSelectedDocument,
} from '../methods/DynamicForms'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { Delete } from '@material-ui/icons'
import Swal from 'sweetalert2'
import useStore from '../store'

const FormTable = () => {
    const { id } = useParams()
    const [documents, setDocuments] = useState([])
    const [formDetails, setFormDetails] = useState([])
    const [columns, setColumns] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [selectionModel, setSelectionModel] = useState([])
    const store = useStore()
    const { toggleUpdate } = store
    const { isUpdated } = store
    function Toolbar(props) {
        const handleClick = () => {
            Swal.fire({
                title: 'Emin misin?',
                text: 'Seçilen formlar silinecektir!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sil',
                cancelButtonText: 'Vazgeç',
            }).then((result) => {
                if (result.isConfirmed) {
                    DeleteFormDocuments(selectionModel, id)
                        .then((response) => {
                            if (response.deletedCount > 0) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Başarılı!',
                                    text: response.deletedCount + ' adet form başarıyla silindi.',
                                })
                                toggleUpdate()
                            }
                        })
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Silme işlemi geçersiz.',
                            })
                        })
                }
            })
        }

        return (
            <GridToolbarContainer className="d-flex justify-content-end">
                <Button disableElevation size="large" color="warning" onClick={handleClick}>
                    <Delete />
                </Button>
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        GetFormDetails(id)
            .then((res) => {
                setFormDetails(res.formDetails)
                return res.formDetails
            })
            .then((details) => {
                Object.keys(details).map((item) => {
                    if (isLoading) {
                        columns.push({
                            field: item,
                            headerName: details[item].htmlLabel,
                            type: details[item].type.toLowerCase(),
                            width: 200,
                            editable: true,
                        })
                    }
                })
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }, [])
    useEffect(() => {
        GetForm(id)
            .then((res) => {
                setDocuments(res)
            })
            .catch((err) => console.log(err))
    }, [isUpdated])
    return (
        <div>
            {!isLoading ? (
                <div className="container bg-white" style={{ height: 1000 }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={documents}
                        columns={columns}
                        checkboxSelection
                        aria-label="collapsible table"
                        hideFooterPagination
                        pagination={false}
                        editMode="row"
                        onRowEditStop={(params, event) => {
                            console.log(params)
                            UpdateSelectedDocument(params.row, id)
                        }}
                        components={{
                            Toolbar: Toolbar,
                        }}
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel)
                        }}
                        selectionModel={selectionModel}
                    />
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default FormTable
