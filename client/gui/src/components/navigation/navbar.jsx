import { useContext } from 'react';
import { Button} from '@mui/material'
import logo from '../../images/logo.png'
import { modalItems } from '../Contexts/Modal';

export const Navbar = () =>{

    const {handleOpen} = useContext(modalItems)

    return(
        <nav>
            <img src ={logo}></img>
            <ul className="list-container">
                <Button variant="contained" color = "secondary" onClick={handleOpen}>Login</Button>
            </ul>
        </nav>
    )
}