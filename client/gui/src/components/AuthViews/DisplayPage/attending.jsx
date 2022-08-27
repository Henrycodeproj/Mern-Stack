import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect, useContext } from 'react';
import { accountContext } from '../../Contexts/appContext';

import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Attending = (users, remainingUsers) => {

    const {user} = useContext(accountContext)
    const currentUser = user

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
        { users.users.map((user, index)=> index <= 2 ?
            <div>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover = {{y:-10, scale:1.3}}
            >
            <Tooltip title = {currentUser.id !== user._id ? `${user.username.charAt(0).toUpperCase() + user.username.slice(1)} is attending` : 'You are attending this event'}>
                <Avatar 
                className = "attending_avatars" 
                alt="Trevor Henderson" 
                src="https://faces-img.xcdn.link/image-lorem-face-6511.jpg" 
                />
            </Tooltip>
            {console.log(user, 'sec')}
            </motion.div>
            </div>
            :
            <span>
                { users.users.length - index === 1 ?
                <motion.div
                whileHover={{scale:1.1}}
                > 
                    <Avatar
                    onClick={handleClick} 
                    sx ={{cursor:"pointer"}} 
                    className='remaining_users_avatar'> + {users.users.length - 3} 
                    </Avatar>

                    <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    >
                    <Typography sx={{ p: 2 }}>
                        {1}
                    </Typography>
                    </Popover>

                </motion.div>
                : null
                 }
            </span>
        )}

        </>
    )
}

export default Attending