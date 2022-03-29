import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

import { GetUserById, GetUsers } from "../methods/GetUsers";
//import ReactDeleteRow from 'react-delete-row';


const UserList = () => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const [quary, setQuary] = useState("");

    useEffect(() => {

        GetUsers().then(response => {

            setData(response);
        });
    }, []);


    console.log(data);


   

    const columnas = [


        {

            name: 'name',
            sortable: true,
            selector: row => row.name,
            reorder: true
        },

        {

            name: 'surname',
            sortable: true,
            selector: row => row.surname,
            reorder: true
        },
        {

            name: 'firstJobDay',
            sortable: true,
            selector: row => row.firstJobDay,
            reorder: true

        },
        {

            name: 'university',
            sortable: true,
            selector: row => row.university,
            reorder: true

        },
        {

            name: 'description',
            sortable: true,
            selector: row => row.description,
            reorder: true

        },

     /*   {

            name: "Actions",
            cell: () => <button onClick={handleChange}>Delete</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button:true

        },*/
       
    ];

  

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const paginationOptions = {
        rowsPerPageText: "Showing ",
        rangeSeparatorText: "to",
        selectAllRowsItem: true,
        selectAllRowsItemtext: "todo"


    };
    function Search(rows) {
        return rows.filter((row) =>

            row.name.toLowerCase().indexOf(quary) > -1 ||
            row.surname.toLowerCase().indexOf(quary) > -1

        );
    }

   /* const handleChange = (state) => {
        setSelectedData(state.setData);
        console.log(data);
      }; */
      
    

  
    return (

        <div >
            <input className="search" type="text" placeholder="search..." value={quary} onChange={(e) => setQuary(e.target.value)} />
           
          

            <DataTable

                columns={columnas}
                data={Search(data)}
                title="Employees List"
                // pagination
                // paginationComponentOptions={paginationOptions}
                fixedHeader
                fixedHeaderScrollHeight="600px"
                selectableRows
               // onSelectedRowsChange={handleChange}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
              
              
            />



        </div>


    );
}

export default UserList;