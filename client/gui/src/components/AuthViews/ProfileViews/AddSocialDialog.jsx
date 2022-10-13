
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddSocialDialog = ({socialMediaModal, setSocialMediaModal}) => {
    const handleClose = () => {
        setSocialMediaModal(false)
    }
    console.log(socialMediaModal, 'media modal')
    return (
          <div>
              <Dialog
                open={socialMediaModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                <TextField id="standard-basic" label="LinkedIn" variant="standard" />
                </DialogContent>
                <DialogActions>
                  <Button 
                  onClick={handleClose}
                  variant="outlined" 
                  color ="secondary"
                  className= "outlined_submit_button"
                >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
          </div>
    )
}

export default AddSocialDialog
