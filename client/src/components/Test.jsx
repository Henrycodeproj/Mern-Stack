import React from 'react'
import { List, Datagrid, TextField, EditButton } from 'react-admin'

const Test = () => {
  return (
    <List>
        <Datagrid>
            <TextField source='_id'/>
            <TextField source='Description'/>
            <EditButton/>
        </Datagrid>
    </List>
  )
}

export default Test