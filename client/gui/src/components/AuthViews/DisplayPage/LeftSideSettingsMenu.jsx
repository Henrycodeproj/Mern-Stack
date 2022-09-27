import Switch from '@mui/material/Switch';
import { useState } from 'react';


export const LeftSideSettingsMenu = () => {

    const [checked, setChecked] = useState(true);   
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    return (
      <div>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        label="Gilad Gray"
      />
      </div>
    )
}
