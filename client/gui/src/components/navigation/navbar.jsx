import { Button } from '@mui/material'
export const Navbar = () =>{
    return(
        <nav>
            <div className="logo">Unplug</div>
            <ul className="list-container">
                <Button variant="contained" color = "warning">Login</Button>
            </ul>
        </nav>
    )
}