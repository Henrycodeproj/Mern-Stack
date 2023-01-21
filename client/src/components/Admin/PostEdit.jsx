
import * as React from "react";
import { Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required } from 'react-admin';
//import RichTextInput from 'ra-input-rich-text';

export const PostEdit = ({...props}) => {
    return(
    <Edit>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" {...props}/>
            <TextInput source="Description" validate={required()} />
        </SimpleForm>
    </Edit>
)
}