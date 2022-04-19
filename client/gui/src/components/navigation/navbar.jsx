import { useState } from 'react';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export const Navbar = () =>{
    //modal for login
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400, I've commented this out and redefined below
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        // I've added these to the demo:
        height: '400px',
        width: '400px',
        overflow: 'auto',
      };

    return(
        <nav>
            <div className="logo">Unplug</div>
            <ul className="list-container">
                <Button variant="contained" color = "warning" onClick={handleOpen}>Login</Button>
            </ul>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form>
                  <input type='text' name=''/>
                  <input type="password" name='' id="" />
                  <Button variant="contained" color="warning">Login</Button>
              </form>
            </Typography>
          </Box>
        </Modal>
        </nav>
    )
}