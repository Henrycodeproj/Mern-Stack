import logo from '../../images/logo.png'
import {Button} from "@mui/material"

export const Navbar = () =>{

    return(
        <nav>
            <img src ={logo}></img>
            <ul className="list-container">
                <li><Button variant = "contained" color ="secondary">Contact</Button></li>
            </ul>
        </nav>
    )
}