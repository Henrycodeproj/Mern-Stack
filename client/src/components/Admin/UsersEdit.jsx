
import * as React from "react";
import { Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required, } from 'react-admin';


export const UsersEdit = ({...props}) => {
    return(
    <Edit>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" {...props} fullWidth/>
            <TextInput source= "username" fullWidth/>
            <TextInput source= "email" fullWidth/>
            <TextInput source= "selfDescription" fullWidth/>
            <TextInput source= "collegeAffiliation" fullWidth/>
        </SimpleForm>
    </Edit>
)}