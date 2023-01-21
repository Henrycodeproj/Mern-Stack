import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import Test from './PostDisplay';
import jsonServerProvider from "ra-data-json-server";
import axios from "axios"
import { PostEdit } from './PostEdit';


export const AdminPage = () => {

    //middleware to format obj into library format
    function getListHandler (response) {
        console.log(response)
        const formattedData = response.map((fields) => ({...fields, id: fields._id}))
        return {
            data: formattedData,
            total: response.length
        }
    }

    const apiUrl = "http://localhost:3001/admin";
    //const dataProvider = jsonServerProvider(apiUrl)
    const dataProvider = {
        getList: async () =>  await axios.get(apiUrl)
        .then(response => getListHandler(response.data)),

        deleteMany: async (resource, params) => 
        await axios.patch(`${apiUrl}/delete`, {resource: resource, params:params})
        .then(response => response.data),

        //updateMany: async (resource, params) => console.log(params)
        //await axios.put(`${apiUrl}/update`, {resource: resource, params:params})
        //.then(response => response.data),

        update: async (resource, params) => 
        await axios.put(`${apiUrl}/update`, {resource: resource, params:params})
        .then(response => response.data),

        getOne: async (resource, params) =>     
        await axios.put(`${apiUrl}/getOne`, {resource: resource, params:params})
        .then(response => response.data),

    }


    return (
        <Admin basename='/admin' dataProvider={dataProvider}>
            <Resource name="Post" list={Test} edit = {PostEdit}/>
        </Admin>
    );
}