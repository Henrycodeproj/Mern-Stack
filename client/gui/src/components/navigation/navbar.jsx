import logo from '../../images/logo.png'
import {Button} from "@mui/material"

export const Navbar = () =>{

    return(
        <nav>
            <a href='http://localhost:3000/'><img src ={logo} alt ="logo"/></a>
            <ul className="list-container">
                <li><Button variant = "contained" color ="secondary">Contact</Button></li>
            </ul>
        </nav>
    )
}