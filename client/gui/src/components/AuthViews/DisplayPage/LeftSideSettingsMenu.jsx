import Switch from '@mui/material/Switch';
import { useState } from 'react';


export const LeftSideSettingsMenu = () => {

    const [checked, setChecked] = useState(true);   
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    return (
      <div className='left_menu_options' style = {{display:"flex", alignItems:"center"}}>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          label="Gilad Gray"
          color="secondary"
        />
        <h4 style = {{color:"white"}}>Dark Mode</h4>
      </div>
    )
}
