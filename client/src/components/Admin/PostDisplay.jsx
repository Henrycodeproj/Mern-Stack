import React from 'react'
import { List, Datagrid, TextField, EditButton, DateField } from 'react-admin'

const Test = () => {
  return (
    <List>
        <Datagrid>
            <TextField source='id'/>
            <TextField source='Description'/>
            <DateField source='createdAt'/>
            <DateField source='expiresAt'/>
            <EditButton label="Edit" basePath='/edit'/>
        </Datagrid>
    </List>
  )
}

export default Test