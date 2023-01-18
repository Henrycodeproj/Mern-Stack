import React from 'react'
import { Admin } from 'react-admin'
import jsonServerProvider from "ra-data-json-server";

const Admin = () => {
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
  return (
    <>
    <Admin dataProvider = {dataProvider}>

    </Admin>
    </>
  )
}

export default Admin