import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { DeleteUsersByIds, GetUsers } from "../methods/GetUsers";
import { isExpired } from '../methods/Account';
import '../UserCreate.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { useNavigate } from "react-router-dom";

import UserEdit from "./UserEdit";

import { Link } from "react-router-dom";
import { Dialog } from "@material-ui/core";

import { generateDoc } from "../methods/CreateDoc";


const UserTable = () => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);

  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const navigate = useNavigate();
  const [title, setTitle] = useState("Employees Table");

  useEffect(() => {
    isExpired().then(res => {
      if (res) {
        navigate("/users")
      }
    })
    GetUsers().then(response => {
      setData(response);

    });
  }, []);

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);


  const columns = [
    {
      width: 20,
      title: " ",
      field: 'image',
      filtering: false,
      searchable: false,
      /* render: data => <img src={data.image} style={{width: 50, borderRadius: '50%'}}/>, */
      render: rowData => (
        <img style={{ height: 50, borderRadius: '50%', width: 50, position: 'static' }} src={rowData.image}
        />

      ),

      sorting: false
    },
    {
      title: 'Full Name',
      field: 'fullname',
      searchable: true,
      sorting: false
    },


    {


      title: 'Orion Start Day',
      field: 'firstJobDay',
      type: 'date',
      searchable: true,
      sorting: true
    },
    {
      title: 'University',
      field: 'university',
      searchable: true,
      sorting: false
    },
  ]

  const [tableData, setTableData] = useState(columns);



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };





  return (
    <div className="container" background-color="#F7F7F7">

      <div className="row mt-4">

        <MaterialTable
          icons={tableIcons}
          title="Employees List"
          data={data}
          columns={columns}


          localization={{
            body: {
              emptyDataSourceMessage:
                <h1 style={{
                  textAlign: 'center', fontSize: 14
                }}>Loading...</h1>
            },

            header: {
              event:
                <h1 style={{
                  textAlign: 'center', fontSize: 14
                }}>Loading...</h1>

            }

          }}

          onSelectionChange={
            (rows) => setSelectedRows(rows)
          }

          actions={[
            {
              icon: () => <DeleteIcon />,

              tooltip: "Delete all selected rows",
              onClick: () => DeleteUsersByIds(selectedRows).then(
                window.location.reload(true)
              ) 

            },
            {
              icon: () => <GetAppIcon />,
              onClick: (event, rowData) => generateDoc(rowData),
            },


          ]}


          detailPanel={[
            {
              icon: () => <KeyboardArrowRightIcon />,
              openIcon: () => <KeyboardArrowDownIcon />,
              tooltip: 'Show Both',
              render: rowData => {
                return (
                  <UserEdit data={rowData}></UserEdit>
                )

              },
            },
          ]}

          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ float: 'right', textAlign: 'center', padding: "0px 10px " }}>
                  <Link to="/" className="btn btn-primary">+</Link>
                </div>
              </div>
            ),
          }}

          options={{
            sorting: true, search: true, searchFieldAlignment: "right", filtering: false, searchFieldVariant: "standard",
            paging: false, actionsColumnIndex: -1, exportAllData: true, showTextRowsSelected: false,
            showSelectAllCheckbox: true, selection: true, addRowPosition: "first", filtering: true,
          }}
        />
      </div>
    </div>
  )
}

export default UserTable;