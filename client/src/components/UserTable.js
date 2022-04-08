import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { DeleteUsersByIds, GetUsers } from "../methods/GetUsers";
import { isExpired } from '../methods/Account';
import '../UserCreate.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Add from '@material-ui/icons/AddBoxRounded';
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

import { Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { useNavigate } from "react-router-dom";
import UserEdit from "./UserEdit";


import { generateDoc } from "../methods/CreateDoc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../store";

const UserTable = () => {

  const store = useStore();
  const isUpdated = store.isUpdated;
  const toggleUpdate = store.toggleUpdate;

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


  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    isExpired().then(res => {
      if (res) {
        navigate("/login")
      }
    })
    GetUsers().then(response => {
      setData(response);
      setLoading(false)
    });
  }, [isUpdated]);

  useEffect(() => {
    document.title = "Personel Listesi";
  })
  const columns = [
    {
      width: 20,
      title: " ",
      field: 'image',
      filtering: false,
      searchable: false,

      render: rowData => (
        <img style={{ height: 50, borderRadius: '50%', width: 50, position: 'static' }} src={"http://172.28.226.108:5000" + rowData.image}
        />

      ),

      sorting: false
    },
    {
      title: 'Ad Soyad',
      field: 'fullname',
      searchable: true,
      sorting: false
    },
    {
      title: 'Orion Başlangıç Tarihi',
      field: 'firstJobDay',
      type: 'date',
      dateSetting: { locale: "tr-TR" },
      searchable: true,
      sorting: true
    },
    {
      title: 'Departman',
      field: 'department',
      searchable: true,
      sorting: false
    },

    {
      title: 'Pozisyon',
      field: 'workTitle',
      searchable: true,
      sorting: false
    },


    // {
    //   title: 'University',
    //   field: 'university',
    //   searchable: true,
    //   sorting: false
    // },
  ]

  const MyNewTitle = ({ text = "Tablo Adı", variant = "h6" }) => (
    <Typography
      variant={variant}
      style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "1.75rem" }}
    >
      {text}
    </Typography>
  );


  return (

    <div className="container">

      <div className="row">

        <MaterialTable
          isLoading={isLoading}
          icons={tableIcons}
          title={<MyNewTitle variant="h3" text="Personel Listesi" />}
          data={data}
          columns={columns}


          localization={{
            body: {
              emptyDataSourceMessage:
                <h1 style={{
                  textAlign: 'center', fontSize: 14
                }}>Listede kayıtlı kullanıcı bulunamadı.</h1>
            },
            toolbar: {
              searchPlaceholder: "Arama"
            }
          }}

          onSelectionChange={
            (rows) => setSelectedRows(rows)
          }

          actions={[
            {
              icon: () => <DeleteIcon />,
              tooltip: "Seçilen tüm satırları sil.",
              onClick: () => DeleteUsersByIds(selectedRows)
                .then(response => {
                  if (response.deletedCount > 0) {
                    toggleUpdate()
                    toast.success(response.deletedCount + " Kullanıcı Silindi!")
                  }
                }).catch((error) => {
                  toast.error("Silme işlemi başarısız.")
                })

            },
            {
              icon: () => <GetAppIcon />,
              onClick: (event, rowData) => generateDoc(rowData),
            },
            {
              icon: () => <Add htmlColor="coral" fontSize="large" />,
              isFreeAction: true,
              onClick: (event) => navigate("/")
            }
          ]}


          detailPanel={[
            {
              icon: () => <KeyboardArrowRightIcon />,
              openIcon: () => <KeyboardArrowDownIcon />,
              tooltip: 'Detayları Göster',
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

              </div>
            ),
          }}

          options={{
            sorting: true, search: true, searchFieldAlignment: "right", searchFieldVariant: "standard",
            paging: false, actionsColumnIndex: -1, exportAllData: true, showTextRowsSelected: false,
            showSelectAllCheckbox: true, selection: true, addRowPosition: "first", filtering: true,
            rowStyle: x => {

              if (x.tableData.id % 2 === 0) {

                return { backgroundColor: "#f2f2f2" }
              } else {
                return { backgroundColor: "#ffffff" }
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default UserTable;