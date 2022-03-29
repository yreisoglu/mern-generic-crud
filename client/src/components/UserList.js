import React, { useEffect, useState, forwardRef  } from "react";
import MaterialTable from "material-table";
import {  GetUserById, GetUsers } from "../methods/GetUsers";
//import { CsvBuilder } from 'filefy'; 
import axios from 'axios';

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

const UserList=()=>{

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


    const [selectedRows,setSelectedRows]=useState([]);
    const [data, setData] = useState([]);

    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {

        GetUsers().then(response => {

            setData(response);
        });
    }, []);

    console.log(data);


  
    const columnas = [

        {

            title: 'image',
            field:'image',
           /* render: data => <img src={data.image} style={{width: 50, borderRadius: '50%'}}/>, */
           render: rowData => (
            <img
              style={{ height: 36, borderRadius: '50%' }}
              src={rowData.avatar}
            />
          ),
           
           
        },
        {

            title: 'name',
            field:'name',
            searchable:true,
           
        },

        {

            title: 'surname',
            field:'surname',
            searchable:true,
        },
        {

            title: 'firstJobDay',
            field:'firstJobDay',
            searchable:true,

        },
        {

            title: 'university',
            field:'university',
            searchable:true,

        },
        {

            title: 'description',
            field:'description',
            searchable:true,

        },
    ]
 
    const handleRowDelete = () => {
     // DeleteUserById(selectedRows.id).then(response => console.log(response));
     
    }

  /*  const exportAllSelectedRows=()=>{
  

        new CsvBuilder("tableData.csv")
         .setColumns(columnas.map(col=>col.title))
         .addRows(selectedRows.map(rowData=>columnas.map(col=>rowData[col.field])))
         .exportFile();
       
       } */
    return(
        <div>
            <MaterialTable
            icons={tableIcons}
             title="User List"
             data={data}
             columns={columnas}

              editable={{
              /*  onRowDelete: selectedRow => new Promise((resolve, reject) => {
                    const index = selectedRow.tableData.id;
                    const updatedRows = [...data]
                    updatedRows.splice(index, 1)
                    setTimeout(() => {
                      setData(updatedRows)
                      resolve()
                    }, 2000)
                  }), */

              }}

              actions={[



                  { //icon:()=><GetAppIcon/>,
                  //onClick: () => exportAllSelectedRows()
                
                },
                {
                    icon: ()=><DeleteIcon/>,
                    tooltip: "Delete all selected rows",
                    onClick: () => handleRowDelete()
                  }

                
              ]}

            detailPanel={[
                {
                    icon:()=><KeyboardArrowRightIcon/>,
                    openIcon:()=><KeyboardArrowDownIcon/>,
                    tooltip: 'Show Both',
                    render: rowData => {
                      return (
                        <div
                          style={{
                            fontSize: 16,
                            textAlign: 'start',
                            color: 'black',
                           
                           
                          }}
                        >
                            <p >Name: {rowData.name}</p>
                           <br/> 
                           <p >Sur Name: {rowData.surname}</p>
                           <br/>
                           <p >First JobDay: {rowData.firstJobDay}</p>  
                          <br/> 
                          <p >University: {rowData.university}</p> 
                           <br/>
                           <p >Description: {rowData.description}</p>  
                           <br/>
                        </div>
                      )
                    },
                  },
              
            ]}
              

              onSelectionChange={(rows)=>setSelectedRows(rows)}
               
                options={{sorting:true, search:true, searchFieldAlignment:"right", filtering:false, searchFieldVariant:"standard",
            paging:false, exportButton:true, actionsColumnIndex:-1,exportAllData:true,showTextRowsSelected:false, 
            showSelectAllCheckbox:false ,selection:true, addRowPosition: "first"
        
        }}
            />
        </div>
    )
}

export default UserList;