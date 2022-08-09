import logo from '../../images/logo.png'
import {Button} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { accountContext } from '../Contexts/authentication'

export const Navbar = () =>{

    const navigateTo = useNavigate()

    const {userStatus, setUserStatus} = useContext(accountContext)
    if (userStatus){
        return(
            <nav>
            {!userStatus? <img src ={logo} alt ="logo" onClick={()=>navigateTo("/")}/>
            :<img src ={logo} alt ="logo" onClick = {()=>navigateTo("/display")}/>}

            <ul className="list-container">
                <li><Button variant = "contained" color ="secondary">Logout</Button></li>
            </ul>
        </nav>
        )
    }
    return(
        <nav>
            {!userStatus? <img src ={logo} alt ="logo" onClick={()=>navigateTo("/")}/>
            :<img src ={logo} alt ="logo" onClick = {()=>navigateTo("/display")}/>}

            <ul className="list-container">
                <li><Button variant = "contained" color ="secondary">Contact</Button></li>
            </ul>
        </nav>
    )
}