import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Avatar from "@mui/material/Avatar";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useRef, useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import "./SearchBarModal.css"
import { accountContext } from '../Contexts/appContext';
import axios from "axios"
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';




export const SearchBarModal = ({anchorEl, setAnchorEl, searchResults, setSearchResults}) => {

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const ref = useRef()
    const navigateTo = useNavigate()
    const {user, setPosts, lastPostIndex} = useContext(accountContext)

    useEffect(() => {
      function handleClickOutside(event) {
        console.log(ref.current.offsetWidth, event.target.offsetWidth)
        if (
        ref.current 
        && !ref.current.contains(event.target) 
        && event.target.offsetWidth >= ref.current.offsetWidth + 50
        ) {
          setAnchorEl(null)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);

    const searchLikeHandler = async (postID) => {
      const url = `http://localhost:3001/posts/search/like/${postID}`
      const data = {
        userID: user.id,
        currentSearch: searchResults
      }
      const response = await axios.patch(url, data, {
        headers:{
          "authorization": localStorage.getItem("Token")
        }
      })
      if (response.status === 200) {
        const URL = `http://localhost:3001/posts/amount/${lastPostIndex}/`;
        axios.get(URL, {
            headers: {
              authorization: localStorage.getItem("Token"),
            },
          })
          .then((res) => setPosts(res.data))
          .catch((err) => console.log(err));
        setSearchResults(response.data)
      }
    }

    return (
        <div >
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ 
            border: 1,
            p: 1, 
            bgcolor: 'background.paper', 
            width:"250px", 
            borderRadius:"5px", 
            boxShadow:"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px", 
            overflowY:"scroll", 
            height:"210px", 
            boxSizing:"border-box"
            }}
          >
            <ul ref = {ref}>
            {
            searchResults && searchResults.map(
              (postInfo) =>
                <div>
                <ListItem sx = {{alignItems:"flex-start", marginTop:"0"}}>
                  <ListItemAvatar>
                    <Avatar src = {null}/>
                  </ListItemAvatar>
                  <div style = {{flexGrow:1}}>
                  <ListItemText 
                  primary={postInfo.posterId.username}
                  secondary={postInfo.Description}
                  sx = {{marginTop:"0"}}
                  />
                    <div style = {{display:"flex", justifyContent:"space-between"}}>
                      {postInfo.attending.some(attending => attending._id === user.id) ? <FavoriteIcon sx = {{color:"red", cursor:"pointer"}} onClick = {()=> searchLikeHandler(postInfo._id)}/> : <FavoriteBorderIcon onClick = {()=> searchLikeHandler(postInfo._id)} sx = {{color:"red", cursor:"pointer"}}/>}
                      {console.log(searchResults)}
                      <div style = {{display:"flex"}}>
                        {console.log(postInfo)}
                        {postInfo.attending.map((attending, index) => index <= 2 ?
                          <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1}}
                          whileHover = {{ y: -10, scale: 1.3}}
                          exit={{ opacity: 0 }}
                          >
                              <Tooltip title = {postInfo._id !== user.id && postInfo.username?
                                   `${postInfo.username.charAt(0). toUpperCase() + postInfo.username.slice(1)} is attending`
                                   :'You are attending this event'}
                              >
                                  <Avatar
                                  onClick = {()=> navigateTo(`/profile/${postInfo._id}`)} 
                                  className = "attending_avatars" 
                                  alt="Trevor Henderson" 
                                  src={
                                      postInfo._id !== user.id 
                                      ? (postInfo.profilePicture 
                                          ? `https://ucarecdn.com/${user.profilePicture}/`
                                          : null
                                        )
                                      : (user.profilePicture 
                                          ? `https://ucarecdn.com/${user.profilePicture}/`
                                          : null
                                        )
                                  }
                                  />
                              </Tooltip>
                          </motion.div>
                           : <Avatar src = {`${attending.profilePicture}`} sx = {{width:"24px",height:"24px"}}/> 
                        )}
                      </div>
                    </div>
                  </div>
                </ListItem>
                </div>
              )
            }
            </ul>
          </Box>
        </Popper>
      </div>
    )
}


